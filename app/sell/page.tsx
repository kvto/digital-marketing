import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectCategory } from "../components/SelectCategory";
import { Textarea } from "@/components/ui/textarea";
import { TipTapEditor } from "../components/Editor";
import { UploadDropzone } from "../lib/uploadthing";
import { Button } from "@/components/ui/button";

export default function SellRoute(){
    return(
        <section className="max-w-7xl mx-autp px-4 md:px-8 mb-14">
            <Card>
                <form>
                    <CardHeader>
                        <CardTitle>Vender tu producto de facil manera</CardTitle>
                        <CardDescription>
                            Por favor, describe el producto con detalle para que pueda ser vendido
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-y-10">
                        <div className="flex flex-col gap-y-2">
                            <Label>Nombre</Label>
                            <Input type="text" placeholder="Nombre del producto"/>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Categoria</Label>
                            <SelectCategory />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label>Precio</Label>
                            <Input placeholder="29$" type="number"/>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label>Sumario</Label>
                            <Textarea placeholder="Por favor, coloca una descripcion del producto aca..."/>
                        </div>
                        <div className="flex flex-col gay-y-2">
                            <Label>Descripcion</Label>
                            <TipTapEditor />
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label>Imagen del producto</Label>
                            <UploadDropzone endpoint="imageUploader"/>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label>Archivo del producto</Label>
                            <UploadDropzone endpoint="productFileUpload"/>
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