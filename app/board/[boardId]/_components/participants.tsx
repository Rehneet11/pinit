"use client";

import { connectionIdToColor } from "@/lib/utils";
import { UserAvatar } from "./user-avatar";
import { useOthers,useSelf } from "@/liveblocks.config";

const MAX_SHOWN_USER=2;

export const Participants=()=>{
    const users=useOthers();
    const currentUser=useSelf();
    const hasMoreUsers = users.length > MAX_SHOWN_USER
    return(
        <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
            <div className="flex gap-2">
                {users.slice(0,MAX_SHOWN_USER)
                .map(({connectionId,info})=>{
                    return(
                        <UserAvatar 
                        borderColor={connectionIdToColor(connectionId)}
                        key={connectionId}
                        src={info?.picture}
                        name={info?.name}
                        fallback={info?.name?.[0] || "A"}/>
                    )
                })}
                {currentUser && (
                    <UserAvatar 
                    borderColor={connectionIdToColor(currentUser.connectionId)}
                    src={currentUser.info?.picture}
                    name={`${currentUser.info?.name}(You)`}
                    fallback={currentUser.info?.name?.[0]}    
                    />
                )}

                {hasMoreUsers &&(
                    <UserAvatar
                    name={`${users.length-MAX_SHOWN_USER} more`}
                    fallback={`+${users.length-MAX_SHOWN_USER}`}/>
                )}
            </div>
        </div>
    )
}
export const ParticipantsSkeleton=()=>{
    return(
        <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]"/>
        
    )
}