import { ClientInfoModel } from "../../../Models/ClientInfoModel";
import "./ClientCard.css";

interface ClientCardProps {
    client: ClientInfoModel
}

export default function ClientCard(props:ClientCardProps): JSX.Element {

    function camelCaseSplit(word:string){
        let newWord = "";
        const regex = /[A-Z]/;
        for(const letter of word){
            if(regex.test(letter)){
                newWord += " " + letter.toLowerCase();
            } else {
                newWord += letter;
            }
        }
        return newWord;
    }

    function testValue(value:any){
        if(value < 0 || typeof value === "object"){
            return false;
        }
        return true;
    }

    function renderTable(){
        const blurStyle = {filter: "blur(5px)"};
        const objectEntries = Object.entries(props.client).filter(([key, value]) => {
            return testValue(value);
        });

        return (
            <table className="ClientCardTable">
                <thead>
                    <tr>
                        {objectEntries.map(([key, value]) => 
                            <td key={key}>
                                {camelCaseSplit(key)}
                            </td>
                        )}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {objectEntries.map(([key, value]) => 
                            key === "password" ? 
                                <td style={blurStyle} key={value}>
                                    {value}
                                </td>
                                :
                                <td style={{textTransform: "capitalize"}} key={value}>
                                    {typeof value === "boolean" ? value + "" : value}
                                </td>
                        )}
                    </tr>
                </tbody>
            </table>
        )
    }
    
    return (
        <div className="ClientCard">
            <div className="ClientCardTitle">Client Info</div>
            {renderTable()}
        </div>
    );
}