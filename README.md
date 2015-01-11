lintel-contrib-navs
===================

> Navigation tools for lintel.

[![npm](https://img.shields.io/npm/v/lintel-contrib-navs.svg)](https://www.npmjs.com/package/lintel-contrib-navs)
[![Bower](https://img.shields.io/bower/v/lintel-contrib-navs.svg)](https://github.com/lintelio/lintel-contrib-navs)


## Getting Started
This module requires Lintel.

If you haven't used [Lintel](http://lintel.io/) before, be sure to check out the [Getting Started](http://lintel.io/getting-started) guide, as it explains how to install and use this module. Once you're familiar with that process, you may install this module with this command:

```shell
bower install lintel-contrib-navs --save
```

Once the module has been installed, you will have to load it in your main SASS file:

```scss
@import "bower_components/lintel-contrib-navs/sass/navs.scss"
```

This module also includes a JavaScript component, which you will have to load separately.

```html
<script src="bower_components/lintel-contrib-navs/dist/navs.min.js" type="text/javascript"></script>
```

You can use [wiredep](https://github.com/taptapship/wiredep) or [grunt-wiredep](https://github.com/stephenplusplus/grunt-wiredep) to automatically inject files in your build process.


## Variables
Check the vars file in the `sass` folder to see the full list of variables you can customize.

#### $nav-padding-y
Default value: `$cushion-y-md`  

Change the default padding-top and padding-bottom.

#### $nav-padding-x
Default value: `$cushion-x-md`  

Change the default padding-left and padding-right.

#### $nav-margin-y
Default value: `$cushion-y-md`  

Change the vertical space between nav items.

#### $nav-padding-x
Default value: `4px`  

Change the horizontal space between items.


## Tab Variables
Tabs prefixed with `$nav-tabs-*` are tab specific.

#### $nav-tabs-bg
Tab background.

#### $nav-tabs-border
Tab border.

#### $nav-tabs-border-list
Tab-list border.

#### $nav-tabs-border-radius
Tab border-radius.

#### $nav-tabs-text
Tab text color.

Use `$nav-tabs-active-bg`, `$nav-tabs-active-border`, and `$nav-tabs-active-text` to customize active colors.

Use `$nav-tabs-hover-bg`, `$nav-tabs-hover-border`, and `$nav-tabs-hover-text` to customize hover colors.


## Pills and Flat Variables
Same as tabs except `$nav-pills-*` and `$nav-flat-*`.


## Examples

#### Tabs
```html
<ul class="nav-list nav-tabs" role="tablist">
  <li class="active" role="presentation">
    <a href="#" role="tab">Home</a>
  </li>
  <li role="presentation">
    <a href="#" role="tab">Profile</a>
  </li>
  <li role="presentation">
    <a href="#" role="tab">Activity</a>
  </li>
</ul>
```

#### Vertical Tabs Left
```html
<ul class="nav-list nav-tabs-y nav-tabs-y-left" role="tablist">...</div>
```

#### Vertical Tabs Right
```html
<ul class="nav-list nav-tabs-y nav-tabs-y-right" role="tablist">...</div>
```

#### Pills
```html
<ul class="nav-list nav-pills" role="tablist">...</div>
```

#### Flat
```html
<ul class="nav-list nav-flat" role="tablist">...</div>
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).


## License
Copyright (c) 2015 Marius Craciunoiu. Licensed under the MIT license.
