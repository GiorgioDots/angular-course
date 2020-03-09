# Deleting all Items in a FormArray
As of __Angular 8+__, there's a new way of __clearing all items__ in a `FormArray`.

```typescript | javascript
(<FormArray>this.recipeForm.get('ingredients')).clear();
```
The `clear()` method automatically loops through all registered `FormControls` (or `FormGroups`) in the FormArray and removes them.

It's like manually creating a loop and calling `removeAt()` for every item.