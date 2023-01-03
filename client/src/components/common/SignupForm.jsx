import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import userApi from '../../api/modules/user.api';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import { setUser } from '../../redux/features/userSlice'

const SignupForm = ({ switchAuthState }) => {
   const dispatch = useDispatch();

   const [isLoginRequest, setIsLoginRequest] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");

   const signinForm = useFormik({
      initialValues: {
         password: "",
         username: "",
         displayName: "",
         confirmPassword: ""
      },
      validationSchema: Yup.object({
         username: Yup.string()
            .min(1, "username minimum 1 character")
            .required("username is required"),
         displayName: Yup.string()
            .min(1, "display name minimum 1 character")
            .required("display name is required"),
         password: Yup.string()
            .min(8, "password minimum 8 character")
            .required("password is required"),
         confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "confirm password not match")
            .min(8, "confirm password minimum 8 character")
            .required("confirm password is required")
      }),
      onSubmit: async values => {
         setErrorMessage(undefined)
         setIsLoginRequest(true)
         const { response, err } = await userApi.signup(values);
         setIsLoginRequest(false)

         if(response) {
            signinForm.resetForm()
            dispatch(setUser(response))
            dispatch(setAuthModalOpen(false))
            toast.success("Sign up success")
         }

         if(err) setErrorMessage(err.message);
      }
   })

   return (
      <Box component="form" onSubmit={signinForm.handleSubmit}>
         <Stack spacing={3}>
            <TextField
               type="text"
               placeholder='display name'
               name="displayName"
               fullWidth
               value={signinForm.values.displayName}
               onChange={signinForm.handleChange}
               color="success"
               error={signinForm.touched.displayName && signinForm.errors.displayName !== undefined}
               helperText={signinForm.touched.displayName && signinForm.errors.displayName}
            />
            <TextField
               type="text"
               placeholder='username'
               name="username"
               fullWidth
               value={signinForm.values.username}
               onChange={signinForm.handleChange}
               color="success"
               error={signinForm.touched.username && signinForm.errors.username !== undefined}
               helperText={signinForm.touched.username && signinForm.errors.username}
            />
            <TextField
               type="password"
               placeholder='password'
               name="password"
               fullWidth
               value={signinForm.values.password}
               onChange={signinForm.handleChange}
               color="success"
               error={signinForm.touched.password && signinForm.errors.password !== undefined}
               helperText={signinForm.touched.password && signinForm.errors.password}
            />
            <TextField
               type="password"
               placeholder='confirm password'
               name="confirmPassword"
               fullWidth
               value={signinForm.values.confirmPassword}
               onChange={signinForm.handleChange}
               color="success"
               error={signinForm.touched.confirmPassword && signinForm.errors.confirmPassword !== undefined}
               helperText={signinForm.touched.confirmPassword && signinForm.errors.confirmPassword}
            />
         </Stack>
         <LoadingButton
            type='submit'
            fullWidth
            size='large'
            sx={{ marginTop: 4 }}
            loading={isLoginRequest}
            variant="contained"
         >
            sign up
         </LoadingButton>

         <Button
            fullWidth
            sx={{ marginTop: 1 }}
            onClick={() => switchAuthState()}
         >
            sign in
         </Button>

         {errorMessage && (
            <Box sx={{ marginTop: 2 }}>
               <Alert severity='error' variant='outlined'>{errorMessage}</Alert>
            </Box>
         )}
      </Box>
   )
}

export default SignupForm