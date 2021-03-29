import React, {memo} from 'react';
import './App.css';

const App = () => {

    const thisUpload = (e: React.ChangeEvent<HTMLInputElement | null>): void=>{
        const data = new FormData();
        if(e && e !== null && e.currentTarget && e.currentTarget.files){
            const imagedata = e.currentTarget.files[0];
            data.append('inputname', imagedata);
            fetch("http://localhost:4000/upload", {
                mode: 'no-cors',
                method: "POST",
                body: data
            }).then(function (res) {
                if (res.ok) {
                    alert("Perfect! ");
                } else if (res.status == 401) {
                    alert("Oops! ");
                }
            }, function (e) {
                alert("Error submitting form!");
            });
        }

    }

    return (
        <>
            <input type="file"
                   name="upload"
                onChange={thisUpload}
            />
        </>
    );
}

export default memo(App);
