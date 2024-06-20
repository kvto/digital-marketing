"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectCategory } from "../components/SelectCategory";
import { Textarea } from "@/components/ui/textarea";
import { TipTapEditor } from "../components/Editor";
import { UploadDropzone } from "../lib/uploadthing";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { JSONContent } from "@tiptap/react";
import { SellProduct, State } from "../actions";
import { useFormState } from "react-dom";
import {toast} from "sonner";

export default function SellRoute(){
    const initalState: State = {message: "", status: undefined};
    const [state, formAction] = useFormState(SellProduct, initalState);
    const [json, setJson] = useState<null | JSONContent>(null);
    const [images, setImages] = useState<null | string[]>(null);

    useEffect(() => {
        if(state?.status === "success"){
            toast.success(state.message);
        } else if(state?.status === "error"){
            toast.error(state.message);
        }
    }, [state])

    return(
        <section className="max-w-7xl mx-autp px-4 md:px-8 mb-14">
            <Card>
                <form action={formAction}>
                    <CardHeader>
                        <CardTitle>Vender tu producto de facil manera</CardTitle>
                        <CardDescription>
                            Por favor, describe el producto con detalle para que pueda ser vendido
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-y-10">
                        <div className="flex flex-col gap-y-2">
                            <Label>Nombre</Label>
                            <Input name="name" type="text" placeholder="Nombre del producto"/>
                            {state?.errors?.["name"]?.[0] && (
                                <p className="text-destructive">{state?.errors?.["name"]?.[0]}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Categoria</Label>
                            <SelectCategory />
                            {state?.errors?.["category"]?.[0] && (
                                <p className="text-destructive">{state?.errors?.["category"]?.[0]}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Precio</Label>
                            <Input placeholder="29$" type="number" name="price"/>
                            {state?.errors?.["price"]?.[0] && (
                                <p className="text-destructive">{state?.errors?.["price"]?.[0]}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label>Sumario</Label>
                            <Textarea name="smallDescription" placeholder="Por favor, coloca una descripcion del producto aca..."/>
                            {state?.errors?.["smallDescription"]?.[0] && (
                                <p className="text-destructive">{state?.errors?.["smallDescription"]?.[0]}</p>
                            )}
                        </div>
                        <div className="flex flex-col gay-y-2">
                            <input type="hidden" name="description" value={JSON.stringify(json)}/>
                            <Label>Descripcion</Label>
                            <TipTapEditor json={json} setJson={setJson}/>
                            {state?.errors?.["description"]?.[0] && (
                                <p className="text-destructive">{state?.errors?.["description"]?.[0]}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <input type="hidden" name="images" value={JSON.stringify(images)} />
                            <Label>Imagen del producto</Label>
                            <UploadDropzone endpoint="imageUploader"
                            onClientUploadComplete={(res) =>{
                                setImages(res.map((item) => item.url))
                            }}
                            onUploadError={(error: Error) => {
                                throw new Error(`${error}`)
                            }}/>
                            {state?.errors?.["images"]?.[0] && (
                                <p className="text-destructive">{state?.errors?.["images"]?.[0]}</p>
                            )}
                        </div>

                    </CardContent>
                    <CardFooter>
                        <Button>
                            Enviar formulario
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </section>
    )
}