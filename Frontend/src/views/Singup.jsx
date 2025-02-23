import logo from "../../public/logo.png"
import FormRegistro from "../components/forms/FormRegistro";

function Singup() {
  return (
    <>
            <main className="w-full h-[100vh] flex items-center justify-center gap-10 flex-col">
        <div className="flex flex-col gap-1.5 items-center">
          <img
            src={logo}
            alt="Logo de CaminoReal"
            className="h-[60px] w-[60px] rounded-md"
          />
          <h1 className="text-AzulA font-bold text-3xl">CaminoReal</h1>
        </div>

        <div className="flex flex-col gap-5 items-center w-4/5 md:w-7/12 lg:w-5/12 xl:w-4/12">
            <h2 className="text-RojoA font-bold text-2xl">Sing Up</h2>
            <FormRegistro />
        </div>
      </main>
    </>
  );
}

export default Singup;
