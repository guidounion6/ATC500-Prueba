"use client"
import axios from "../../../axios_config/axios.config"
import { ErrorMessage, Field, Form, Formik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import * as Yup from "yup"

const singinSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email obligatorio")
        .email("Email debe ser válido"),
    password: Yup.string()
        .required("Contraseña obligatoria")
})

const SignInPage = () => {

    const router = useRouter()
    return (
        <section className='min-h-screen flex flex-col flex-center bg-gray-200'>
            <div className='max-w-sm w-full p-6 bg-graybg rounded-lg shadow-md mt-10'>
                <h1 className='text-2xl text-primary mb-6'>Ingresa</h1>
                <div>
                    <Formik
                        initialValues={{ name: "", email: "", password: "" }}
                        validationSchema={singinSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                console.log(values)
                                const response = await axios.post("users/login", values)
                                localStorage.setItem("token", response.data.token)
                                router.push("/dashboard")
                            } catch (error) {
                                console.log("Error loging in...try again", error)
                            } finally {
                                setSubmitting(false)
                            }
                        }
                        }
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className="block text-white text-sm font-bold mb-2 text-start"
                                    >
                                        Email:
                                    </label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm bg-white border-2 py-2 px-3 text-black"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-terciary text-sm mt-1"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="password"
                                        className="block text-white text-sm font-bold mb-2 text-start"
                                    >
                                        Password:
                                    </label>
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm bg-white border-2 py-2 px-3 text-black"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="text-terciary text-sm mt-1"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className='w-full bg-primary text-white mt-2 py-2 px-4 rounded-md hover:bg-accent focust:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus_ring-offset-gray-100'
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Cargando..." : "Iniciar Sesion"}
                                </button>
                                <div className='p-6'>
                                    <div className='flex flex-center'>
                                        <Link href="/sign-up">
                                            <span className='text-primary hover:underline'>No tienes cuenta ? </span>
                                        </Link>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </section >
    )
}

export default SignInPage