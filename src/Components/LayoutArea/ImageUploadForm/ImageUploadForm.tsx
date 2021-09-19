import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import globals from "../../../Services/Globals";
import "./ImageUploadForm.css";

export default function ImageUploadForm(): JSX.Element {

    const {register, handleSubmit, setValue, reset, formState: { errors }} = useForm<any>({
        defaultValues: {}
    });

    const [image, setImage] = useState<any>();

    const send = async (file:any) => {
        const blob = new Blob([JSON.stringify(file)]);
        let formData = new FormData();
        formData.append("file", blob);
        console.log(blob);
        console.log(formData);
        try{
            await axios.post(globals.urls.couponImage, file);
            toast.success("Uploaded successfully", {
                theme:"colored"
            });
        } catch(err:any) {
            toast.error(err.message,{
                theme:"colored"
            });
        }
    }

    const handleImage = () => {
        let image;
        const response = axios.get(globals.urls.couponImage + "/1").then((response) => {
            console.log(response);
            image = response;
        });
        return image;
    }
    
    return (
        <div className="ImageUploadForm">
			<form onSubmit={handleSubmit(send)}>
               <input type="file" {...register("image")}/>
               {/* <img style={{width:"200px"}} src={globals.urls.couponImage + "/1"} /> */}
               <button type="submit" className="FIELD LINK APP__BUTTON">Send</button>
               <img style={{width:"200px"}} src={handleImage()} alt="aaa"/>
            </form>
        </div>
    );
}