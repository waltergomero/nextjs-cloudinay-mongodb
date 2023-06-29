import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { alertService } from "@/services/alert.service";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AddEditUserPage(props) {
  const user = props?.data;

  const isAddMode = !user;
  const title = !user ? "Add User Information" : "Edit User Information";
  const router = useRouter();

  const [isAdmin, setIsAdmin] = useState("false")
 
  useEffect(() => {
    if(user){
      if(user.isAdmin === true){
        setIsAdmin("true")
      }
      else{
        setIsAdmin("false")
      }
      };
  }, []);

  // form validation rules
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("First Name  is required"),
    email: Yup.string().required("Email  is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  // set default form values if in edit mode
  if (!isAddMode) {
    formOptions.defaultValues = props.data;
  }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    return isAddMode ? createUser(data) : updateUser(user._id, data);
  }

  function createUser(data) {
    const adduser = {...data, "rbAdmin": isAdmin}
    return userService
      .register(adduser)
      .then(() => {
        alertService.success("User was added successful", {
          keepAfterRouteChange: true,
        });
        router.push("/admin/user/");
      })
      .catch(alertService.error);
  }

  function updateUser(user_id, data) {
    const udpdateuser = {...data, "rbAdmin": isAdmin}
    return userService
      .update(user_id, udpdateuser)
      .then(() => {
        alertService.success("User was updated successful", {
          keepAfterRouteChange: true,
        });
        router.push("/admin/user");
      })
      .catch(alertService.error);
  }

  const onCancelEventHandler = (e) => {
    e.preventDefault();
    router.back();
  };

  const onOptionChangeHandler = (e) => { 
    setIsAdmin(e.target.value)
  }
  return (
    <>
      <div className="flex h-full flex-col items-center ">
        <div className="columns-sm px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-md border border-indigo-200">
          <h5 className="text-gray-900 text-lg leading-tight font-medium ml-6 mt-2">
            {title}
          </h5>
          <div className="mt-4 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <input
                    type="hidden"
                    name="user_id"
                    {...register("_id")}
                  />
                  <div className="col-span-6 sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">
                      First Name:
                    </label>
                    <input
                      name="first_name"
                      maxLength="32"
                      type="text"
                      {...register("first_name")}
                      className={`w-full px-4 text-sm py-1 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400
                                        ${
                                          errors.first_name ? "is-invalid" : ""
                                        }`}
                    />
                    <div className="invalid-feedback text-sm font-small">
                      {errors.first_name?.message}
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name:
                    </label>
                    <input
                      name="last_name"
                      maxLength="32"
                      type="text"
                      {...register("last_name")}
                      className={`w-full px-4 text-sm py-1 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400
                                        ${
                                          errors.last_name ? "is-invalid" : ""
                                        }`}
                    />
                    <div className="invalid-feedback text-sm font-small">
                      {errors.last_name?.message}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email:
                  </label>
                  <input
                    name="email"
                    maxLength="32"
                    type="email"
                    {...register("email")}
                    className={`w-full px-4 text-sm py-1 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400
                                        ${errors.email ? "is-invalid" : ""}`}
                  />
                  <div className="invalid-feedback text-sm font-small">
                    {errors.email?.message}
                  </div>
                </div>
                
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Password:
                    </label>
                    <input 
                      disabled = {isAddMode ? false : true}
                      name="password"
                      maxLength="32"
                      type="password"
                      {...register("password")}
                      className={`w-full text-sm px-4 py-1 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400
                                        ${errors.password ? "is-invalid" : ""}`}
                    />
                    <div className="invalid-feedback text-sm font-small mb-2">
                      {errors.password?.message}
                    </div>
                    {!isAddMode  &&  (
                    <Link href={`/admin/user/resetpassword/${user._id}`}
                      className="px-6 py-1 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                      >
                       Reset Password
                      </Link>
                      )}
                  </div>
                  <div className=" mt-2">
                  <label className="text-sm font-medium text-gray-700">
                      Administrator ?:
                    </label>
                    <input 
                    type="radio" 
                    name="rbIsAdmin" 
                    value="true"
     
                    checked={isAdmin === "true"}
                    onChange={onOptionChangeHandler}
                    className="text-sm text-gray-700 ml-2" />
                        <label htmlFor="true" className="text-sm text-gray-700 ml-1">Yes</label>

                    <input 
                    type="radio" 
                    name="rbIsAdmin" 
                    value="false" 
    
                    checked={isAdmin === "false"}
                    onChange={onOptionChangeHandler} 
                    className="text-sm text-gray-700 ml-2"  />
                    <label htmlFor="false" className="text-sm text-gray-700 ml-1">No</label>
                  </div>
              
              </div>
              <div className="text-right">
                <button
                  onClick={onCancelEventHandler}
                  className="px-6 py-1 mt-4 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <span>&nbsp; </span>
                <button
                  disabled={formState.isSubmitting}
                  className="px-6 py-1 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  {formState.isSubmitting && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

