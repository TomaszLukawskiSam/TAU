## TAU Components > Angular example

### Introduction

TAU components on the Web Components bass integrate seamlessly with Angular applications.
Using the component does not require the developer to know TAU build.

### Example

<iframe src="./apps/angular/index.html" width="360px" height="640px"></iframe>

[Example](./apps/angular/index.html)

![QR code](./images/angular-QR.png)

###	Implementation.
	The addition to the application complies with the rules for Web Components.

```html
<tau-spin class="default-spin"
    min="1902"
    max="2050"
    :value=year
    loop="enabled"
    roll-height="custom"
    item-height="50"
    momentum-level="1"
    duration="500">
</tau-spin>
```


Licensed under [MIT License](license.html) by Samsung Electronics Co., Ltd. &copy;  2020
ver 0.1