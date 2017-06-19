export enum Categories{
    HEARTS, NEW, AREA, JEWELRY, FITNESS, MAKE_UP, CLOTHES, ACCESSORY, OTHERS
}

export class CategoryMapper{

    public static forId(id:number): string{
        switch (id){
            case 0: return Categories[Categories.HEARTS];
            case 1: return Categories[Categories.NEW];
            case 2: return Categories[Categories.AREA];
            case 3: return Categories[Categories.JEWELRY];
            case 4: return Categories[Categories.FITNESS];
            case 5: return Categories[Categories.MAKE_UP];
            case 6: return Categories[Categories.CLOTHES];
            case 7: return Categories[Categories.ACCESSORY];
            case 8: return Categories[Categories.OTHERS];
        }
        return Categories[Categories.HEARTS]
    }
}