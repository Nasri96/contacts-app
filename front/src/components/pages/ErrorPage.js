import Container from "../UI/Container";
import Header from "../UI/Header";
import { useRouteError } from "react-router-dom";
import ContentContainer from "../UI/ContentContainer";

const ErrorPage = () => {
    const error = useRouteError();
    
    return (
        <Container>
            <Header />
            <ContentContainer title="Error">
                <p style={{textAlign: "center"}}>{error.data && error.data.message}</p>
            </ContentContainer>
           
        </Container>
    )
}

export default ErrorPage;