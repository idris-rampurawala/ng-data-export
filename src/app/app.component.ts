import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ExcelJson } from './interfaces/excel-json.interface';
import { User } from './interfaces/user.interface';
import { ExportService } from './services/export.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-data-export';
  users: User[];
  @ViewChild('userTable') userTable: ElementRef;

  constructor(
    private exportService: ExportService
  ) { }

  ngOnInit(): void {

    this.users = [
      {
        id: 1,
        firstName: 'Mark',
        lastName: 'Otto',
        handle: '@mdo'
      },
      {
        id: 2,
        firstName: 'Jacob',
        lastName: 'Thornton',
        handle: '@fat'
      },
      {
        id: 3,
        firstName: 'Larry',
        lastName: 'the Bird',
        handle: '@twitter'
      },
    ];

  }


  /**
   * Function prepares data to pass to export service to create excel from Table DOM reference
   *
   */
  exportElmToExcel(): void {
    this.exportService.exportTableElmToExcel(this.userTable, 'user_data');
  }

  /**
   * Function prepares data to pass to export service to create excel from Json
   *
   */
  exportToExcel(): void {

    const edata: Array<ExcelJson> = [];
    const udt: ExcelJson = {
      data: [
        { A: 'User Data' }, // title
        { A: '#', B: 'First Name', C: 'Last Name', D: 'Handle' }, // table header
      ],
      skipHeader: true
    };
    this.users.forEach(user => {
      udt.data.push({
        A: user.id,
        B: user.firstName,
        C: user.lastName,
        D: user.handle
      });
    });
    edata.push(udt);

    // adding more data just to show "how we can keep on adding more data"
    const bd = {
      data: [
        // chart title
        { A: 'Some more data', B: '' },
        { A: '#', B: 'First Name', C: 'Last Name', D: 'Handle' }, // table header
      ],
      skipHeader: true
    };
    this.users.forEach(user => {
      bd.data.push({
        A: String(user.id),
        B: user.firstName,
        C: user.lastName,
        D: user.handle
      });
    });
    edata.push(bd);
    this.exportService.exportJsonToExcel(edata, 'user_data_customized');
  }

  /**
   * Funtion prepares data to pass to export service to create csv from Json
   *
   */
  exportToCsv(): void {
    this.exportService.exportToCsv(this.users, 'user-data', ['id', 'firstName', 'lastName', 'handle']);
  }

}
