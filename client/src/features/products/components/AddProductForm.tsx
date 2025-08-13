import { Button, CircularProgress, Stack, TextField, Typography } from "@mui/material"
import AppLink from "../../../components/CustomLink"
import ErrorMessages from "../../auth/components/errorMessge"
import { useForm } from "react-hook-form"
import { addProductSchema, type AddProductSchema } from "@millionsclub/shared-libs/client"
import { zodResolver } from "@hookform/resolvers/zod"





const AddProductForm = () => {

     const {register,handleSubmit, formState:{ errors: validationError} } = useForm <AddProductSchema> ({
          resolver: zodResolver(addProductSchema)
     })

  return (
   <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextField
          {...register("title")}
          label="Title"
          variant="standard"
          error={!!validationError.title}
          helperText={validationError.title?.message}
          fullWidth
        />

        <TextField
          {...register("brand")}
          label="Password"
          type="password"
          variant="standard"
          error={!!validationError.brand}
          helperText={validationError.brand?.message}
          fullWidth
        />

        <Button
          disabled={isLoading}
          type="submit"
          size="large"
          variant="contained"
        >
          Signin
          {isLoading && (
            <CircularProgress sx={{ marginLeft: 1 }} size="2rem" />
          )}
        </Button>

        <Typography>
          Don’t have an account?{" "}
          <AppLink
            to={"/signup"}
            sx={{ fontWeight: "bold", fontSize: 20, textWrap: "nowrap" }}
          >
            Sign up
          </AppLink>
        </Typography>

        {isError && <ErrorMessages errors={errors} />}
      </Stack>
    </form>
  )
}

export default AddProductForm