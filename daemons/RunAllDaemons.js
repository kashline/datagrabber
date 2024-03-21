import MealScraper from "./MealScraper.js"

export default function RunAllDaemons(){
    setInterval(MealScraper, 1*1000)
}