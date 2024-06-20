"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import {z} from "zod"

export type State = {
    status: "error" | "success" | undefined;
    errors?: {
        [key: string]: string[];
    };
    message?: string | null;
}

const productSchema = z.object({
    name: z
    .string()
    .min(3, {message: "El nombre necesita tener mas 5 caracteres"}),
    category: z.string().min(1, {message: "Categoria es requerida"}),
    price: z.number().min(1, {message: "El precio debe ser mayor a 1"}),
    smallDescription: z.string().min(10, {message: "Por favor, describa su producto"}),
    description: z.string().min(10, {message: "Descripcion es requerida"}),
    images: z.array(z.string(), {message: "Imagenes son requerida"}),})

export async function SellProduct(prevState: any, formData: FormData){
    const {getUser} = getKindeServerSession(); 
    const user = await getUser();

    if(!user){
        throw new Error("Something went wrong");
    }

    const validateFields = productSchema.safeParse({
        name: formData.get("name"),
        category: formData.get("category"),
        price: Number(formData.get("price")),
        smallDescription: formData.get("smallDescription"),
        description: formData.get("description"),
        images: JSON.parse(formData.get("images") as string),
    });

    if(!validateFields.success){
        const state: State = {
            status: "error",
            errors: validateFields.error.flatten().fieldErrors,
            message: "Ops, existe un error con alguno de los datos..."
        };

        return state;
    }

    const state: State = {
        status: "success",
        message: "Tu producto ha sido creado"
    }
}