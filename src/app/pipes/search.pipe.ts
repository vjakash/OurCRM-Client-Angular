import {Pipe,PipeTransform} from '@angular/core';

@Pipe({
name:'search'
})
export class SearchPipe implements PipeTransform{
    transform(topics:any,searchTerm:string,type:string){
        let length=searchTerm.length;
        if(!topics||!searchTerm){
            return topics;
        }
        else{
            if(type=='leads'){
                return topics.filter(topic=>{
                    if(topic['company'].toLowerCase().substring(0,length).indexOf(searchTerm.toLowerCase()) !==-1){
                       return topic;
                   }else if((topic['firstName']+" "+topic['lastName']).toLowerCase().substring(0,length).indexOf(searchTerm.toLowerCase()) !==-1){
                       return topic;
                   }else if(topic['email'].toLowerCase().substring(0,length).indexOf(searchTerm.toLowerCase()) !==-1){
                       return topic;
                   }else if(topic['title'].toLowerCase().substring(0,length).indexOf(searchTerm.toLowerCase()) !==-1){
                       return topic;
                   }else if(String(topic['phone']).substring(0,length).indexOf(searchTerm) !==-1){
                       return topic;
                   }else if(String(topic['mobile']).substring(0,length).indexOf(searchTerm) !==-1){
                       return topic;
                   }else if(topic['leadSource'].toLowerCase().substring(0,length).indexOf(searchTerm.toLowerCase()) !==-1){
                       return topic;
                   }else if(topic['leadStatus'].toLowerCase().substring(0,length).indexOf(searchTerm.toLowerCase()) !==-1){
                       return topic;
                   }else if(topic['ownerName'].toLowerCase().substring(0,length).indexOf(searchTerm.toLowerCase()) !==-1){
                       return topic;
                   }
               });
            }else if(type=='service-requests'){
                return topics.filter(topic=>{
                    if(topic['requestTitle'].toLowerCase().substring(0,length).indexOf(searchTerm.toLowerCase()) !==-1){
                        return topic;
                    }else if(topic['requestStatus'].toLowerCase().substring(0,length).indexOf(searchTerm.toLowerCase()) !==-1){
                        return topic;
                    }else if(topic.contact['company'].toLowerCase().substring(0,length).indexOf(searchTerm.toLowerCase()) !==-1){
                        return topic;
                    }else if((topic.contact['firstName']+" "+topic.contact['lastName']).toLowerCase().substring(0,length).indexOf(searchTerm.toLowerCase()) !==-1){
                        return topic;
                    }else if(topic.contact['email'].toLowerCase().substring(0,length).indexOf(searchTerm.toLowerCase()) !==-1){
                        return topic;
                    }else if(topic.contact['title'].toLowerCase().substring(0,length).indexOf(searchTerm.toLowerCase()) !==-1){
                        return topic;
                    }else if(String(topic.contact['phone']).substring(0,length).indexOf(searchTerm) !==-1){
                        return topic;
                    }else if(String(topic.contact['mobile']).substring(0,length).indexOf(searchTerm) !==-1){
                        return topic;
                    }else if(topic['ownerName'].toLowerCase().substring(0,length).indexOf(searchTerm.toLowerCase()) !==-1){
                        return topic;
                    }
                });

            }else if(type=='contacts'){
                return topics.filter(topic=>{
                    if(topic['company'].toLowerCase().substring(0,length).indexOf(searchTerm.toLowerCase()) !==-1){
                       return topic;
                   }else if((topic['firstName']+" "+topic['lastName']).toLowerCase().substring(0,length).indexOf(searchTerm.toLowerCase()) !==-1){
                       return topic;
                   }else if(topic['email'].toLowerCase().substring(0,length).indexOf(searchTerm.toLowerCase()) !==-1){
                       return topic;
                   }else if(topic['title'].toLowerCase().substring(0,length).indexOf(searchTerm.toLowerCase()) !==-1){
                       return topic;
                   }else if(String(topic['phone']).substring(0,length).indexOf(searchTerm) !==-1){
                       return topic;
                   }else if(String(topic['mobile']).substring(0,length).indexOf(searchTerm) !==-1){
                       return topic;
                   }else if(topic['contactSource'].toLowerCase().substring(0,length).indexOf(searchTerm.toLowerCase()) !==-1){
                       return topic;
                   }else if(topic['ownerName'].toLowerCase().substring(0,length).indexOf(searchTerm.toLowerCase()) !==-1){
                       return topic;
                   }
               });
            }else if(type =='users'){
                return topics.filter(topic=>{
                   if((topic['firstName']+" "+topic['lastName']).toLowerCase().substring(0,length).indexOf(searchTerm.toLowerCase()) !==-1){
                       return topic;
                   }else if(topic['email'].toLowerCase().substring(0,length).indexOf(searchTerm.toLowerCase()) !==-1){
                       return topic;
                   }else if(String(topic['phone']).substring(0,length).indexOf(searchTerm) !==-1){
                       return topic;
                   }else if(String(topic['mobile']).substring(0,length).indexOf(searchTerm) !==-1){
                       return topic;
                   }else if(topic['managerName']){
                        if(topic['managerName'].toLowerCase().substring(0,length).indexOf(searchTerm.toLowerCase()) !==-1){
                            return topic;
                        }
                   }else if(topic['totalRevenue']){
                        if(topic['totalRevenue'].toLowerCase().substring(0,length).indexOf(searchTerm.toLowerCase()) !==-1){
                            return topic;
                        }
                    }
               });
            }
            
        }
        
        
    }
}