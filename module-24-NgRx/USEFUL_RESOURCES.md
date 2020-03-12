# Alternative NgRx Syntax
The NgRx team also released an __alternative syntax__ for creating actions, reducers, effects etc.

The approach and setup shown in this course is a bit more verbose (which actually has the advantage of seeing more of the things that go on under the hood). Exploring the alternative, a bit shorter syntax might therefore be an interesting next step.

Jost created a nice post where he summarizes the new syntax + how to adjust the course project to use it: https://www.udemy.com/the-complete-guide-to-angular-2/learn/lecture/14466642#questions/7350498

Also check out the official docs to learn more about it: https://ngrx.io/docs

__Again, just because it's important__: This syntax is __not__ better, faster or more secure than the one taught in the course. The entire switch of the official docs is pretty drastic (and hard to understand to be very honest) since the syntax taught in this course was the syntax used for close to two years now. Many teams will certainly still be on that syntax and that alone is a strong reason to learn it.

# Installation
`npm install --save @ngrx/store`

`npm install --save @ngrx/effects`


# Useful Resources & Links
Useful Resources:

- Official Docs: https://ngrx.io

# Example

https://github.com/ngrx/platform/tree/master/projects/example-app

# DevTools

[Chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

`npm install --save-dev npm install @ngrx/store-devtools@3.2.4 --save`