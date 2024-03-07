
const Footer = () => {
  return (
    <footer className="text-zinc-500 p-4 fixed bottom-0  z-10">
    <div className="container mx-auto">
      <div className="flex flex-row justify-between items-center">
        <div className="items-center space-x-4">
          <span>Copyright &copy; 2023. All rights reserved.</span>
        </div>
  
        {/* <div className="flex items-center space-x-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:underline">Terms of Service</a>
        </div> */}
      </div>
    </div>
  </footer>
  

  )
}

export default Footer