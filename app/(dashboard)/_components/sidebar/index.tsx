import { List } from "./list"
import { NewButton } from "./new-button"
export const Sidebar =()=>{
    return(
        <aside 
        className="fixed z-[1] left-0 bg-amber-800 h-full w-[60px] flex p-3 flex-col gap-y-4 text-stone-100">
            <List/>
            <NewButton/>
        </aside>
    )
}