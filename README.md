# Angular Casacader

`angular-cascader` Custom cascader component for Angular to select from an associated dataset

<img src="https://raw.githubusercontent.com/Shalabha/demo_cascader/master/example-cascader.png" alt="Example" width="293"/>

## Demo

![Angular cascader Demo](https://raw.githubusercontent.com/Shalabha/demo_cascader/master/example-cascader.gif)

## Getting Started

## Features

 - Can be used to select from a set of associated data
 - Get the selected option event
 - Filtering of options
 - Able to pass disabled options

## Features planning in next releases

 - Option to select only parent element
 - Positioning of the cascader dropdown
 - Custom sizes of cascader dropdown 

## Installation

 * `npm install ngx-select-dropdown`

### Usage

 * import `AngularCasacaderModule` into your app.module;

````
import { AngularCasacaderModule } from 'angular-cascader';
````
* add `AngularCasacaderModule` to the imports of your NgModule:
`````
@NgModule({
  imports: [
    ...,
    AngularCasacaderModule
  ],
  ...
})
class YourModule { ... }
`````
* use `<lib-angular-casacader></lib-angular-casacader>` in your templates to add the custom cascader in your view like below

````
<lib-angular-casacader [settings] = "dropdownSettings" [dropdownOptions] = "data" (selectOption) = "dropdownSelected($event)"></lib-angular-casacader>
````

## Config

### Input
* `dropdownOptions: object[]` - Corresponds to the dropdown option array object
````
dropdownOptions = [{
         id:  1//corresponds to id of option;
        name: "opt 1"// Corresponds to label of option;
        disabled: false // Whether to disable the option, defaults to false
        children: [] //Array of object with id and name if the option has submenu
      }]
````
* `dropdownSettings: object` -  Corresponds to the cascade dropdown settings
````
dropdownSettings = {
         enableSearchFiltering: false - `true/false` // Whether to enable filtering
      }
````

### Output

* `selectOption: Event` - Output event that list the selected options

## Changelog
* v0.1.0
````
Simple cascader that has limited settings option: filtering and disabled options.
````
* v0.1.1
````
Updated Readme.md 
````
* v0.1.2
````
Updated Readme.md with demo and screenshot
````




`



