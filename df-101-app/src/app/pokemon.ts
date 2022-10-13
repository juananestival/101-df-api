export interface Pokemon {
    id:number,
    name:string,
    forms:Forms[],
    abilities:ability[],
    moves:move[],
    types:type[],
    sprites: {
        front_default:string,
        other: {
            dream_world: {
                front_default:string
            }
    
        }
    },
   
}
interface Forms {
    name:string,
    url:string
}
interface ability {
    ability: {
        name:string,
        url:string
    }
   
}
interface move {
    move: {
        name: string,
        url:string
    },
}
interface type {
    type: {
        name: string
    },
}  
   


