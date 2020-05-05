import React,{useState} from "react"
import { useForm } from "react-hook-form";
import Select from "react-select";
import * as yup from "yup";

const SelectOption = React.forwardRef(({ label, register }, ref) => (
  <>
    <label>{label}</label>
    <select name={label} ref={ref}>
      <option value="20">20</option>
      <option value="30">30</option>
    </select>
  </>
));

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

const SignupSchema = yup.object().shape({
  website: yup.string().url()
});
function Demo(props) {
const { register, handleSubmit,triggerValidation,reset,setValue,getValues,watch,errors} = useForm({
  defaultValues: {
    firstName: "bill",
    lastName: "luo",
    email: "bluebill1049@hotmail.com"
  },
  // validationSchema: SignupSchema,
submitFocusError: true
});

const [values, setReactSelect] = useState({
    selectedOption: []
  });
  const handleMultiChange = selectedOption => {
    setValue("reactSelect", selectedOption);
    setReactSelect({ selectedOption });
  };
  const handleSubmitSignupForm = (data) => {
  console.log("data",data)
  }
  return (
    <>
      <div>
        <section >
          <div>
         
            <div>
              <div>
                <h1>Form</h1>
                <div>
                  <form onSubmit={handleSubmit(handleSubmitSignupForm)}>
                    
                     
                        <div>
                          <input
                            type="text"
                            name="firstName"
                            ref={register({ required: true })}
                          />
                          <label htmlFor=""> First Name </label>
                          {errors.firstName && errors.firstName.type==="required" && (
                            <div className="error-line">
                              Please enter your first name
                            </div>
                          )}
                        </div>
                      
                        <div>
                          <input
                            type="text"
                            name="lastName"
                            id=""
                            ref={register({ required: true })}
                          />
                          <label htmlFor=""> Last Name </label>
                          {errors.lastName && errors.lastName.type==="required" && (
                            <div className="error-line">
                              Please enter your last name
                            </div>
                          )}
                        </div>
                      
                        <div>
                          <input
                            type="email"
                             name="email"
                            ref={register({ required: true,pattern:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ })}
                            className={watch("email") ? "active" : ""}
                          />
                          <label htmlFor=""> Email </label>
                         {errors.email && errors.email.type==="required" &&(
                            <div className="error-line">
                              Please enter your email address
                            </div>
                          )}
                          {errors.email&& errors.email.type==="pattern" &&  (
                            <div className="error-line">
                              Please Enter valid email
                            </div>
                          )}
                        </div>
                    
                        <div>
                          <input
                            type="password"
                            name="password"
                            ref={register({ required: true,minLength: 8 })}
                          />
                          <label htmlFor=""> Password </label>
                          {errors.password && errors.password.type==="required" && (
                            <div className="error-line">
                              Please enter a password
                            </div>
                          )}
                          {errors.password && errors.password.type==="minLength" && (
                            <div className="error-line">
                              Password length should be 8 or more
                            </div>
                          )}
                        </div>
                     
                        <div>
                          <input
                            type="password"
                            name="confirmPassword"
                            ref={register({ required: true })}
                          />
                          <label htmlFor=""> Confirm Password </label>
                          {errors.confirmPassword && errors.confirmPassword.type==="required" &&(
                            <div className="error-line">
                              Please confirm the password
                            </div>
                          )}
                          {errors&&watch("confirmPassword")&&watch("password")&& watch("confirmPassword")!==watch("password") && (
                            <div className="error-line">
                              Please make sure the passwords match
                            </div>
                          )}
                        </div>
                        <div>
                          <SelectOption label="Age" ref={register} />
                        </div>
                         <div>
                        <lable className="reactSelectLabel">React select</lable>
                        <Select
                            className="reactSelect"
                            name="filters"
                            placeholder="Filters"
                            value={values.selectedOption}
                            options={options}
                            onChange={handleMultiChange}
                            isMulti
                        />
                        </div>
                     <div>
                        <label>Website</label>
                        <input type="text" name="website" ref={register} />
                        {errors.website && <p>{errors.website.message}</p>}
                    </div>
                        <div>
                          <input
                            type="checkbox"
                            name="conditions"
                            id="conditions"
                            ref={register({ required: true })}
                          />
                          {errors.conditions && (
                            <div className="error-line">
                              Please agree
                            </div>
                          )}
                        </div>
                     
                        <div>
                          <button type="submit" 
                          className={"btn"}
                          >
                            <abbr>Sign Up</abbr>
                          </button>
                        </div>
                        <div>
                         <button
                            type="button"
                            onClick={() => {
                            setValue("firstName", "Harshil");
                            }}
                        >
                            Set Values
                        </button>
                        </div>
                        <div>
                        <div>
                          <button
                            onClick={() => {
                            alert(JSON.stringify(getValues()));
                            }}
                        >
                            Get Current Values
                        </button>
                        </div>
                        <div>
                        <button
                        type="button"
                        onClick={async () => {
                        const result = await triggerValidation("lastName");
                        if (result) { console.log("valid input") }
                        }}
                    >
                        Trigger with result
                    </button>
                    </div>
                    <input
                        type="button"
                        onClick={() => reset()}
                        value="Custom Reset Field Values & Errors"
                    />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Demo