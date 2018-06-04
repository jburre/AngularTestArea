import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name:"summary"
})
export class SummaryPipe implements PipeTransform {
    transform(movieTitel: string, limit?:number) {
        if (movieTitel===undefined)return "";
        let words:Array<string>=this.makeStringtoLowerCaseArray(movieTitel);
        words = this.convertArray(words);
        return this.convertArrayBackToString(words);
    }

    private makeUpperCase(word:string):string{
        return word.charAt(0).toUpperCase()+word.slice(1);
    }

    private makeStringtoLowerCaseArray(movieTitel:string):Array<string>{
        movieTitel = movieTitel.toLocaleLowerCase();
        let words:Array<string> = movieTitel.split(" ");
        return words;
    }

    private convertArray(words:Array<string>):Array<string>{
        for (let i=0;i<words.length;i++){
            if (i===0){
                words[i]=this.makeUpperCase(words[i]);
            } else {
                if (words[i].localeCompare("of")!=0&&words[i].localeCompare("the")!=0){
                    words[i]=this.makeUpperCase(words[i]);
                }
            }
        }
        return words;
    }

    private convertArrayBackToString(words:Array<string>):string{
        let retString:string="";
        words.forEach(word => {
            retString=retString+word+" ";
        });
        return retString;
    }
}