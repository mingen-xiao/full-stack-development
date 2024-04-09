import React from "react";
// "Formik": This library is easy to validate the data to be able to submit
//           (tell the user if they got a filed before submitting a form)
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const CreatePost = () => {
  //   To pass the values inside
  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  // Contains each one of the fields we need in the form
  // Use "Yup" to validate 驗證 what exactly we need
  const validationSchema = Yup.object().shape({
    // "Yup" helps to validate whether the input is a "String"
    // "required()" means "title" is necessary
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
    // "min()" & "max()" means the size
    username: Yup.string().min(3).max(16).required(),
  });

  //   To get the data from the form automatically when clicked
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data).then((response) => {
      // Set the list of posts = the response data from the API request
        console.log("IT WORKED!");//   setListOfPosts(response.data); // To display data received into the application
    });
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          {/* "Field": An input that would be used in the form (i.e. The tile of the Post) */}
          {/* "id": Random unique ID */}
          {/* "name": Same as the field in the database */}
          {/* "placeholder": Describe what should be written here (i.e. input) */}
          <Field
            id="inputCreatePost"
            name="title"
            placeholder="(Ex. Title...)"
          />
          <label>Post: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            id="inputCreatePost"
            name="postText"
            placeholder="(Ex. Post...)"
          />
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. Enzo123...)"
          />

          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreatePost;
