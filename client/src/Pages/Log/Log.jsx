// import Asitelog from "./logcomponents/Asitelog";
import LogViewer from "./Logviewer";
// import LogTable from "./LogTable";
import "./Log.css";
const Log = () => {
  return (
    <div className="logimg h-screen w-full">
      <LogViewer/>
   {/* <div className="flex flex-row w-screen h-screen">
<div className="w-2/12" >
<Asitelog/>
</div>


<div className="w-10/12">
<LogTable/>
</div>
    </div> */}
    </div>
 
  )
}

export default Log