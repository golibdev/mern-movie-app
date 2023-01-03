import { LoadingButton } from '@mui/lab';
import { Box, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Container from '../components/common/Container';
import uiConfigs from '../configs/ui.configs';
import { useState } from 'react';
import userApi from '../api/modules/user.api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/features/userSlice';
import { setAuthModalOpen } from '../redux/features/authModalSlice';

const PasswordUpdate = () => {
  const [onRequest, setOnRequest] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: ""
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "password minimum 8 character")
        .required("password is required"),
      newPassword: Yup.string()
        .min(8, "new password minimum 8 character")
        .required("new password is required"),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "confirm new password not match")
        .min(8, "confirm new password minimum 8 character")
        .required("confirm new password is required")
    }),
    onSubmit: async values => onUpdate(values)
  })

  const onUpdate = async (values) => {
    if (onRequest) return
    setOnRequest(true)

    const { response, err } = await userApi.updatePassword(values);
    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      form.resetForm();
      navigate('/');
      dispatch(setUser(null));
      dispatch(setAuthModalOpen(true));
      toast.success("Update password success! Please re-login")
    }
  }
  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={"update password"}>
        <Box component={"form"} maxWidth="400px" onSubmit={form.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              type="password"
              placeholder='password'
              name="password"
              fullWidth
              value={form.values.password}
              onChange={form.handleChange}
              color="success"
              error={form.touched.password && form.errors.password !== undefined}
              helperText={form.touched.password && form.errors.password}
            />
            <TextField
              type="password"
              placeholder='new password'
              name="newPassword"
              fullWidth
              value={form.values.newPassword}
              onChange={form.handleChange}
              color="success"
              error={form.touched.newPassword && form.errors.newPassword !== undefined}
              helperText={form.touched.newPassword && form.errors.newPassword}
            />
            <TextField
              type="password"
              placeholder='confirm new password'
              name="confirmNewPassword"
              fullWidth
              value={form.values.confirmNewPassword}
              onChange={form.handleChange}
              color="success"
              error={form.touched.confirmNewPassword && form.errors.confirmNewPassword !== undefined}
              helperText={form.touched.confirmNewPassword && form.errors.confirmNewPassword}
            />
          </Stack>
          <LoadingButton
            type='submit'
            fullWidth
            size='large'
            sx={{ marginTop: 4 }}
            loading={onRequest}
            variant="contained"
          >
            update password
          </LoadingButton>
        </Box>
      </Container>
    </Box>
  )
}

export default PasswordUpdate