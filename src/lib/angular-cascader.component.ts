import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularCasacaderService } from './angular-cascader.service';
import { IDropdownOptions } from './model/dropdown-option.interface';

export interface IDropdownSettings {
  enableSearchFiltering?: boolean;
}


@Component({
  selector: 'lib-angular-casacader',
  templateUrl: './angular-cascader.component.html',
  styleUrls: ['./angular-cascader.component.scss'],
})
export class AngularCasacaderComponent implements OnInit {
  @Input() dropdownOptions: IDropdownOptions[];
  @Input()
  set settings(settings: IDropdownSettings) {
    this.optionSettings = settings || {
      enableSearchFiltering: false
    };
  }

  get settings(): IDropdownSettings { return this.optionSettings; }
  // Output event that emit the selected list items
  @Output() selectOption = new EventEmitter<IDropdownOptions[]>();

  // Parent dropdown open status
  showDropDown = false;

  // Correspond to the selected list element
  selectedListItem: IDropdownOptions[];

  // Selected Elem ID
  selectedId: number[];
  selectedOption: string;
  isInputEntered: boolean;
  filterInput: string;
  private optionSettings: any;
  filterData: any;

  constructor(private cascaderService: AngularCasacaderService) {
    this.selectedOption = '';
    this.selectedId = [];
    this.isInputEntered =  false;
    this.filterInput = '';
    // this.filterData = [];
  }

  ngOnInit(): void {
    this._init();
  }

  /**
   * Internal function ro set the cascader status and fetch filter list if filtering is enabled
   */
  private _init() {
   this._setCascaderSt(this.dropdownOptions);
   if (!this.enableSearchFilter()) {
       this.filterData = this.cascaderService.generateFilterList(this.dropdownOptions);
    }
  }

  /**
   * Recurssive fn that loops through child elements to initialise the open status and parent id of elements
   * @param data : Corresponds to the master data set
   */
  private _setCascaderSt(data: Array<IDropdownOptions>): void {
    data.map((elem: IDropdownOptions) => {
      const { id, children } = elem;
      // If current elemnt has children, set the dropdown status of child elem as false and recursively iterate through the child elemnt
      if (children && children.length) {
        children.showSubmenu = false;
        children.map((innerChildElem: IDropdownOptions) => innerChildElem.parentId = id);
        this._setCascaderSt(children);
      }
    });
  }


  /**
   * Function on clicking the select button
   */
  displayDropdown(): void {
    this.showDropDown = !this.showDropDown;
    this.selectedListItem = [];
    this._setCascaderSt(this.dropdownOptions);
  }

  /**
   * Triggers on clicking a list item
   * @param item  - Corresponds to the current list item clicked
   * @param event - HTML DOM event
   */
  async displayCascader(item: IDropdownOptions, event) {
    const { children, parentId } = item;
    // Corresponds to parent list elem
    if (!parentId) {
      this.selectedListItem = [];
      // Calling this function to rest all the child subemnu open flag
      this._setCascaderSt(this.dropdownOptions);
    }
    // If children elems are present, set submenu open status to true
    if (children && children.length) {
      children.showSubmenu = true;
    } else {
      this.selectedListItem.push({ id: item.id, name: item.name });
      event.stopPropagation();
      // Delaying the select event to avoid the immediate closing of dropdown
      // await this._delay(500);
      this._setInputModel();
      this.showDropDown = false;
      this.selectOption.emit(this.selectedListItem);
      return;
    }
    this.selectedListItem.push({ id: item.id, name: item.name });
    event.stopPropagation();
  }

  // /**
  //  * @param ms - Corresponds to delay time
  //  */
  // private _delay(ms: number) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }


  /**
   * Internal function to set the display answer from the selcted item array
   */
  private _setInputModel() {
    const selectedListNames = this.selectedListItem.map((list: IDropdownOptions) => list.name);
    this.selectedOption = selectedListNames.toString().split(',').join('/');
  }

  /**
   * Check whethr the list item is selected
   * @param id  - Corresponds to selected item id
   */
  isItemSelected(id: number): boolean {
    if (this.selectedListItem.length) {
      const selectedElem = this.selectedListItem.find((elem: IDropdownOptions) => elem.id === id);
      return selectedElem ? true : false;
    } else {
      return false;
    }

  }

  /**
   * Triggers on clikcing close button and resettimg all flags
   * @param event - HTML DOM event
   */
  reset(event): void {
    this.selectedOption = '';
    this.showDropDown = false;
    this.filterInput = '';
    // event.stopPropagation();
  }

  /**
   * Triggering on blur of the button to hide the dropdown
   */
  onBlur(event) {
    if (this.selectedListItem.length) {
      this.showDropDown = false;
    }
  }

  /**
   * Function to check whether search filtering is enabled
   */
  enableSearchFilter() {
    return !this.settings.enableSearchFiltering || false;
  }

  /**
   * Emit the selcted data item to parent
   * @param data - Corresponds to selected data from filtered list
   */
  selectFilteredData(data) {
    if (data) {
      this.selectOption.emit(data);
      this.selectedListItem = data;
      this._setInputModel();
      this.filterInput = '';
      this.isInputEntered = false;
    }
  }

}
