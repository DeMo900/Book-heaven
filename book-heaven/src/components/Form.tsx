import FormHeader from "./FormHeader"
import Input from "./Input"
import FormFooter from "./FormFooter"
const Form = () => {
    return (
        <>
        <FormHeader />
        <Input labelName="email" labelValue="EMAIL ADDRESS" type="email" placeholder="name@anthology.com" />
        <Input labelName="password" labelValue="PASSWORD" type="password" placeholder="Enter your password" />
        <FormFooter instructions="Don't have an account?" buttonText="ENTER HEAVEN" />
        </>
    )
}
export default Form   