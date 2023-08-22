import React from "react";
import axios from 'axios';
import {
  useNavigate,
} from "react-router-dom";

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";
// assets
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

// ============================|| FIREBASE - LOGIN ||============================ //

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [response, setResponse] = React.useState(null);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          username: "",
          password: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .max(255)
            .required("nom d'utilisateur est obligatoire"),
          password: Yup.string().max(255).required("Mot de passe est obligatoire"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {


          const formData = new FormData();
          formData.append("username", values.username);
          formData.append("password", values.password);

          axios
            .post(
              `https://tast//Hotel/LoginUser.php/`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((res) => {
              console.log(res);
              setResponse(res);
              
              if (res.data.error == false) {
                localStorage.setItem("user",res.data.keysUser);
                window.location.href = '/';             
              } else {
                setError("Nom d'utilisateur ou mot de passe est incorrect");
              }
              // window.location.reload(false);
            })
            .catch((error) => {
              
              setError(error);
              setResponse(null);
            })
            .finally(() => {
              // setOpen(true);
            });
      
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="username-login">Nom d'utilisateur</InputLabel>
                  <OutlinedInput
                    id="username-login"
                    type="username"
                    value={values.username}
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter nom d'utilisateur"
                    fullWidth
                    error={Boolean(touched.username && errors.username)}
                  />
                  {touched.username && errors.username && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-username-login"
                    >
                      {errors.username}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? (
                            <EyeOutlined />
                          ) : (
                            <EyeInvisibleOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-password-login"
                    >
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
               <Grid item xs={12}>
                <FormHelperText error>{error}</FormHelperText>
              </Grid>
              <Grid item xs={12}>
                {/* <AnimateButton> */}
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
                {/* </AnimateButton> */}
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
