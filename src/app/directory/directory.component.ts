import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterPipe } from '../filter.pipe';
import { LoggingService } from '../logging.service';
import { DataService } from '../data.service';
declare var firebase:any;

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css'],
  providers: [ LoggingService , DataService ]
})
export class DirectoryComponent implements OnInit {

	name:string;
	style = {'green':true, 'yellow':false, 'font-weight':false};
	check = true;

	students = [];

  constructor(private route:ActivatedRoute , private logger:LoggingService , private dataService: DataService) {
  		this.name = route.snapshot.params['name'];
   }

   logIt()
   {
		this.logger.log();
   }



  ngOnInit() {
  	/*this.dataService.fetchData().subscribe( 
			(data) => this.students = data
		);*/

		this.fbGetData();
  }

  fbGetData()
  {
  	firebase.database().ref('/').on('child_added', (snapshot) =>{
  		this.students.push(snapshot.val())
  	})
  }

  fbPostData(name,FC)
  {
  	firebase.database().ref('/').push({name:name, FC:FC});
  }
  
}
