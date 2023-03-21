import { useFormik } from "formik";
import * as Yup from "yup";
import {signIn} from 'next-auth/react'
import {useRouter} from "next/router"
//formik ini acuannya pake name & type,

export default function Login() {

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .max(30, "Must be 30 character or less")
        .email("Invalid email address")
        .required("Please enter your email"),
      password: Yup.string().required("Please enter your password"),
    }),
    onSubmit: async (value) => {
      //call api here
      console.log("ini valuenya",{value} );
      const credentials = await signIn(
        'credentials',
        {
          email: value?.email,
          password: value?.password,
          redirect: false
        }
      )

      if(credentials.ok){
        router.push('/')
      }
      console.log("ini credentials: ",credentials);
    },
  });

  return (
    <div className='w-full h-screen !bg-gray-400 flex items-center justify-center'>
      <div className='w-[400px] min-h [400px] !bg-white rounded-xl p-20'>
        <form
          onSubmit={formik.handleSubmit}
          className='flex flex-col space-y-6'>
          <label
            htmlFor='email'
            className='w-full my-4 flex flex-col space-y-4'>
            <span>Email</span>
            <input
              //ini "type" untuk onChange ("name juga kalau onChange")
              type='email'
              //ini acuannya pake "name"
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder='input your email'
            />
            {formik.errors &&
              formik.touched &&
              formik.errors?.email &&
              formik.touched?.email && (
                <span className='!text-red-500 !text-xs'>
                  {formik.errors?.email}
                </span>
              )}
          </label>
          <label
            htmlFor='password'
            className='w-full my-4 flex flex-col space-y-4'>
            <span>Password</span>
            <input
              type='password'
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder='input your password'
            />
            {formik.errors &&
              formik.touched &&
              formik.touched.password &&
              formik.errors.password && (
                <span className='!text-red-500 !text-xs'>
                  {formik.errors?.password}
                </span>
              )}
          </label>
          <button
            type='submit'
            className='w-full rounded-xl !bg-blue-500 !text-white'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
