import {v} from "convex/values"
import {mutation, query} from "./_generated/server"


const images=[
    "/placeholders/img1.svg",
    "/placeholders/img2.svg",
    "/placeholders/img3.svg",
    "/placeholders/img4.svg",
    "/placeholders/img5.svg",
    "/placeholders/img6.svg",
    "/placeholders/img7.svg",
    "/placeholders/img8.svg",
    "/placeholders/img9.svg",
    "/placeholders/img10.svg",
    "/placeholders/img11.svg",
    "/placeholders/img12.svg",
    "/placeholders/img13.svg",
    "/placeholders/img14.svg",
]
export const create = mutation({
    args:{
        orgId:v.string(),
        title:v.string(),
    },
    handler:async (ctx,args)=>{
        const identity= await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Unauthorized");
        }
        const randomImage=images[Math.floor(Math.random()*images.length)];
        const board = await ctx.db.insert("boards",{
            title:args.title,
            orgId:args.orgId,
            authorId:identity.subject,
            authorName:identity.name!,
            imageUrl:randomImage
        });
        return board;
    }
})

export const remove = mutation({
    args:{id:v.id("boards")},
    handler:async(ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity();
    
    if(!identity){
        throw new Error("Unauthorized to perform this action")
    }
    const userId= identity.subject;
    const existingFavourite = await ctx.db
        .query("userFavourites")
        .withIndex("by_user_board",(q)=>
        q
            .eq("userId",userId)
            .eq("boardId",args.id)
        )
        .unique();
    if(existingFavourite){
        await ctx.db.delete(existingFavourite._id)
    }
           
    await ctx.db.delete(args.id)
    }
})

export const update=mutation({
    args:{id:v.id("boards"), title:v.string()},
    handler:async(ctx,args)=>{
        const identity= await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Unauthorized to perform this action")
        }
        const title = args.title.trim();
        if(!title){
            throw new Error("Title is Required")
        }
        if(title.length>50){
            throw new Error("Title shoul be smaller than 50 Character")
        }
        const board =  await ctx.db.patch(args.id,{
            title:args.title
        });
        return board;
    }
});

export const favourite = mutation({
    args:{id:v.id("boards"), orgId:v.string()},
    handler:async(ctx,args)=>{
        const identity= await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Unauthorized to perform this action")
        }
        const board = await ctx.db.get(args.id);
        if(!board){
            throw new Error("Board not available")
        }
        const userId=identity.subject;
        const existingFavourite = await ctx.db
            .query("userFavourites")
            .withIndex("by_user_board_org",(q)=>
                q
                .eq("userId",userId)
                .eq("boardId",board._id)
                .eq("orgId",args.orgId)
            )
            .unique();
        if(existingFavourite){
            throw new Error("Board is already a Favourite")
        }
        await ctx.db.insert("userFavourites",{
            userId,
            boardId:board._id,
            orgId:args.orgId,
        })
        return board;
    }
})

export const unfavourite = mutation({
    args:{id:v.id("boards")},
    handler:async(ctx,args)=>{
        const identity= await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Unauthorized to perform this action")
        }
        const board = await ctx.db.get(args.id);
        if(!board){
            throw new Error("Board not available")
        }
        const userId=identity.subject;
        const existingFavourite = await ctx.db
            .query("userFavourites")
            .withIndex("by_user_board",(q)=>
                q
                .eq("userId",userId)
                .eq("boardId",board._id)
                
            )
            .unique();
        if(!existingFavourite){
            throw new Error("Favourite Board not found")
        }
        await ctx.db.delete(existingFavourite._id)
        return board;
    }
})
export const get= query({
    args:{id:v.id("boards")},
    handler:async(ctx, args)=> {
        const board=ctx.db.get(args.id)
        return board;
    },
})