import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

const EditIngredients = ({ ingredientsInitial }: { ingredientsInitial: string[] }) => {
    const [ingredients, setIngredients] = useState<string[]>(ingredientsInitial)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = event.target
        setIngredients(prev => {
            const table = [...prev]
            table[index] = value
            return table
        })
    }

    const handleDelete = (index: number) => {
        setIngredients(prev => {
            const table = [...prev]
            table.splice(index, 1)
            return table
        })
    }

    return (
        <div className="my-3 flex flex-col">
            <input type="hidden" name="ingredients" value={JSON.stringify(ingredients.filter(ingredient => (ingredient.length > 0)))} />
            <span className="block font-bold">Edit ingredients</span>
            <div className="gap-3 my-3 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center relative">
                        <Input placeholder="New ingredient..." className="pr-10" type="text" name={index.toString()} value={ingredient} onChange={(e) => handleChange(e, index)} />
                        <Trash className="cursor-pointer text-red-400 rounded-r-md bg-gray-600 transition-all hover:bg-gray-500 absolute right-0 top-0 bottom-0 w-8 p-1.5 font-bold h-full" onClick={() => handleDelete(index)} />
                    </div>
                ))}
            </div>
            <Button type="button" className="px-12 self-start" onClick={() => setIngredients(prev => [...prev, ''])}>Add Ingredient</Button>
        </div>
    )
}

export default EditIngredients