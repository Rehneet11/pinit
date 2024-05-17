import Image from "next/image";
export const EmptyFavourites=()=>{
    return(
        <div className="h-screen flex flex-col items-center justify-center">
            <Image src="./NoFavourites.svg" alt="No Favourites"
            height={300} width={300}/>
            <h2 className="text-3xl font-semibold mt-6">
                No Favourites Found 😞
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                You currently have No Favourites
            </p>
        </div>
    )
}