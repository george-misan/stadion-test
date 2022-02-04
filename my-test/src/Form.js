import React, { useState } from "react"
import axios from "axios"
import styled from "styled-components"
import { useForm } from "react-hook-form"

const arr = {
  firstName: {
    label: "FIRST NAME",
    placeholder: "e.g Brian",
    type: "input",
    name: "first_name",
  },
  lastName: {
    label: "FAMILY NAME",
    placeholder: "",
    type: "input",
    name: "last_name",
  },
  date: {
    label: "CHOOSE A DAY",
    placeholder: "",
    type: "date",
    name: "date",
  },
  attendees: {
    label: "NUMBER OF ATTENDEES",
    placeholder: "",
    type: "number",
    name: "attendees",
  },
  company: {
    label: "COMPANY NAME",
    placeholder: "e.g Stadion",
    type: "input",
    name: "company",
  },
  email: {
    label: "EMAIL",
    placeholder: "",
    type: "input",
    name: "email",
  },
  telephone: {
    label: "TELEPHONE",
    placeholder: "",
    type: "input",
    name: "telephone",
  },
  wheelChair: {
    label: "Do you need wheelchair access",
    placeholder: "",
    type: "checkbox",
    name: "wheelChair_access",
  }
}

const prices = {
  first: {
    range: "1 - 3",
    price: "£50",
  },
  second: {
    range: "4 - 6",
    price: "£40",
  },
  third: {
    range: "6 +",
    price: "£35",
  }
}

const Wrapper = styled.div`

* {
    font-family: 'Roboto', sans-serif;
}
  text-align: left !important;
  position: relative;
  background: #fff;
  max-width: 600px;
  position: relative;
  margin: 0 auto;
  display: block;
  padding: 4rem 2rem;
  box-shadow: 0px 8px 40px rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  h3:nth-of-type(2) {
    line-height: 1;
    margin-bottom: 0;
  }

  span {
    display: inline-block;
    margin-bottom: .8rem;
  }

  .redHeading {
      margin-top: 48px;
      color: #ED0433;
  }

  fieldset {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 10px;
    margin-bottom: 10px;
    border: hidden;
    padding: 0;
    margin: 60px 0;
  }

  label {
    color: #1A2434;
    display: block;
    font-family: "Lato", sans-serif;
    margin-bottom: 5px;
    font-size: 14px;
    opacity: 0.9;
  }

  input {
    width: 100%;
    font-size: 16px;
    font-family: "Lato", sans-serif;
    padding: 0.25em 0.5em 0.5em 0;
    border-top-style: hidden;
    border-right-style: hidden;
    border-left-style: hidden;
    border-bottom: 1px solid #767C85;
    transition: 180ms box-shadow ease-in-out;
    margin-bottom: 1rem;
    color: #1A2434;
  }

  input:focus {
    border-color: #52e3c2;
    box-shadow: 0 0 0 3px hsla(245, 100%, 245, 0.8);
    outline: 3px solid transparent;
  }

  input[type="submit"] {
    margin-top: 1rem;
    padding: 14px 34px;
    background: #FF0037;
    color: #FFF;
    font-weight: 500;
    width: 100%;
    border: hidden;

    :hover {
      background: #FF0037;
    }

    :disabled {
      background: #e1e2e2;
    }
  }

  select {
    padding: 0.3em 0.5em;
    background-color: transparent;
    border: 2px solid #eee;
    border-radius: 4px;
    margin-bottom: 1rem;
    width: 90%;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.4;
    cursor: default;
  }
`

const ErrorMessage = styled.div`
  color: #ed5565;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 10px;
  padding: 0;
`
const ListItem = styled.div`
display: flex;
justify-content: space-between;
border-bottom: 1px solid #D1D1D1;
font-size: 16px;

span {
    margin: 14px 0;
}
`
const TotalPrice = styled.div`
display: flex;
justify-content: end;
font-size: 30px;
margin: 10px 0 20px 0;
color: #1A2434;

`
const StyledAttendees = styled.div`
border-top: 1px solid #D1D1D1;
padding-top: 20px;
display: flex;
justify-content: space-between;
`
const Checkbox = styled.div`
display: flex;

input[type='checkbox']{
    width: 20px !important;
    margin-left: 0;
  }

  label {
      padding-left: 5px;
  }
`
const Dialog = styled.div`
position: absolute;
text-align: center;
width: 280px;
height: 41px;
background: #fff;
box-shadow: 0px 8px 40px rgba(0, 0, 0, 0.1);
border-radius: 3px;
bottom: 150px;
margin: auto;
left: 0;
right: 0;
display: flex;
align-items: center;
justify-content: center;
padding: 10px 5px;

span {
    margin-bottom: 0 !important;
}
`

const Form = () => {
  const { register, formState: { errors, isSubmitting, isSubmitSuccessful}, watch, handleSubmit } = useForm({ mode: "onChange" });
  const attendees = watch('attendees')

  //make an array of disable dates
  const dates = ["2019-08-07", "2019-08-20", "2019-09-01"];

  const [submitError, setSubmitError] = useState(false)

  // post data
  const postStoredData = async (data) => {
    const res = await axios.post(
      "http://www.mocky.io/v2/5d00cfff3200007d00f9d809",
      { data }
    )
    return res.data
  }

  const calculatePrice = () => {
      let totalPrice = ''
      if (!attendees) {
          return
      }

      if (attendees > 0 && attendees < 4) {
        totalPrice = attendees * 50;
      } else if (attendees <= 6) {
        totalPrice = attendees * 40;
      } else {
        totalPrice = attendees * 35;
      }

      return `£${totalPrice}`;
  }
  return (
    <Wrapper>
      <h2>Attend event</h2>
      <h3 className="redHeading">Early bird offer</h3>
      <span>
        Discount are available for groups. The bigger the group, the bigger the discount. Prices are as follows:
      </span>

      <h3>Price per attendee</h3>
        {Object.values(prices).map((item) => 
            <ListItem key={item.range}>
                <span>{item.range}</span>
                <span>{item.price}</span>
            </ListItem>
        )}
      {isSubmitting && <Dialog><span>Loading....</span></Dialog>}
      {isSubmitSuccessful && <Dialog><span>You have succesfully submitted!</span></Dialog>}
      {submitError && <Dialog><span>Error experienced posting data!</span></Dialog>}
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            const stringified = JSON.stringify(data)
            const res = await postStoredData(stringified)
          } catch (error) {
            setSubmitError(true)
          }
        })}
      >
        <fieldset disabled={isSubmitting}>
          {Object.values(arr).map((item) => {
            const { name, label, type, placeholder } = item
            if (type === "input") {
              return (
                <div key={item.label}>
                  <label htmlFor={name}>{label}</label>
                  <input
                    name={name}
                    placeholder={placeholder}
                    {...register(name, { required: "This field is required" })}
                  />
                  {errors[name] && (
                    <ErrorMessage>
                      &#9888; {`${errors[name].message}`}
                    </ErrorMessage>
                  )}
                </div>
              )
            } else if (type === "date") {
                return (
                    <div key={item.label}>
                      <label htmlFor={name}>{label}</label>
                      <input
                        name={name}
                        type="date"
                        placeholder={placeholder}
                        min="2019-08-05" 
                        max="2019-09-13"
                        {...register(name, { required: "This field is required", validate: value => dates.indexOf(value)  === -1, })}
                      />
                      {errors[name] && (
                        <ErrorMessage>
                          &#9888; {errors[name].type === "validate" ? `Sorry, but the date you have selected is unavailable.Please select another` : `${errors[name].message}`}
                        </ErrorMessage>
                      )}
                    </div>
              )
            } else if (type === "checkbox") {
                return (
                    <Checkbox key={item.label}>
                      <input
                        name={name}
                        type="checkbox"
                        placeholder={placeholder}
                        {...register(name, { required: "This field is required" })}
                      />
                      <label htmlFor={name}>{label}</label>
                    </Checkbox>
              )
            } else {
              return (
                <div key={item.label}>
                  <label htmlFor={name}>{label}</label>
                  <input
                    name={name}
                    type="number"
                    min="1"
                    max="100"
                    placeholder={placeholder}
                    {...register(name, { required: "This field is required" })}
                  />

                  {errors[name] && (
                    <ErrorMessage>
                      &#9888; {`${errors[name].message}`}
                    </ErrorMessage>
                  )}
                </div>
              )
            }
          })}
        </fieldset>
        <>
        <StyledAttendees><span>Attendees</span><span>{attendees ? attendees : '0'}</span></StyledAttendees>
        <TotalPrice>{calculatePrice()}</TotalPrice>
        </>
        <input value="BUY" type="submit" />
      </form>
    </Wrapper>
  )
}

export default Form
