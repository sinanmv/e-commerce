import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allproduct:any[],searchTerm:string,propertyName:string): any[] {
    const result:any[]= []
    if(!allproduct ||searchTerm == '' || propertyName == ''){
        return allproduct
    }

    allproduct.forEach((item:any)=>{
      if(item[propertyName].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())){
        result.push(item)
      }
    })
    return result;
  }

}
