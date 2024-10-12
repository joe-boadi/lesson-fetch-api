import { buttonVariants } from "@/components/ui/button"



export default function Navbar () {
    return (
        <nav className="justify-between p-4 sticky blur-lg m-2">
            <div>
                <ul className=" text-lg">
                    <li><a href="/">Home</a></li>
                    <li><a href="/">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </div>

            <button className={buttonVariants({ variant: "outline" })}>Log in</button>

        </nav>
    )
}