
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/pages/Root";
import ContactsPage from "./components/pages/ContactsPage";
import { loader as loaderGetContacts } from "./components/pages/ContactsPage";
import ErrorPage from "./components/pages/ErrorPage";
import ContactPage from "./components/pages/ContactPage";
import { loader as loaderShowContact } from "./components/pages/ContactPage";
import NewContactPage from "./components/pages/NewContactPage";
import EditContactPage from "./components/pages/EditContactPage";
import { loader as loaderEditContact } from "./components/pages/EditContactPage";
import { action as actionFormContact } from "./components/contacts/ContactForm";
import { action as actionDeleteContact } from "./components/pages/ContactPage";
import RegisterPage from "./components/pages/RegisterPage";
import LoginPage from "./components/pages/LoginPage";
import { action as actionLogin } from "./components/pages/LoginPage";
import { getAuthToken } from "./helpers/manage-auth";
import { action as actionLogout } from "./components/pages/LogoutPage";
import { action as actionRegister } from "./components/pages/RegisterPage";

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      id: "root",
      loader: getAuthToken,
      children: [
        {
          path: "login",
          element: <LoginPage />,
          action: actionLogin
        },
        {
          path: "register",
          element: <RegisterPage />,
          action: actionRegister
        },
        {
          path: "logout",
          action: actionLogout
        },
        {
          path: ":userId",
          
          children: [
            {
              path: "contacts",
              element: <ContactsPage />,
              loader: loaderGetContacts
            },
            {
              path: "contacts/:contactId",
              element: <ContactPage />,
              loader: loaderShowContact,
              action: actionDeleteContact
            },
            {
              path: "contacts/new",
              element: <NewContactPage />,
              action: actionFormContact
            },
            {
              path: "contacts/:contactId/edit",
              element: <EditContactPage />,
              loader: loaderEditContact,
              action: actionFormContact
            }
          ]
        }
      ],
      errorElement: <ErrorPage />
    }
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;
