import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RobotStackComponent } from './robot-stack.component';

describe('RobotStackComponent', () => {
  let component: RobotStackComponent;
  let fixture: ComponentFixture<RobotStackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RobotStackComponent ],
      imports:[FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RobotStackComponent);
    component = fixture.componentInstance;
      fixture.detectChanges();
    component.ngOnInit();
  });
  it('Form Invalid when Empty', () => {
    expect(component.robotStackForm.valid).toBeFalsy();
  });
  it('Form Field Validity Check', () => {
    let valuesData = component.robotStackForm.controls['roboValue'];
    expect(valuesData.valid).toBeFalsy();

    let errors={};
    errors = valuesData.errors
    expect(errors['required']).toBeTruthy();

    valuesData.setValue('');
    errors = valuesData.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('Form Field Validity Check Failed', () => {
    let valuesData = component.robotStackForm.controls['roboValue'];
    expect(valuesData.valid).toBeFalsy();

    let errors={};
    errors = valuesData.errors
    expect(errors['required']).toBeTruthy();

    valuesData.setValue('');
    errors = valuesData.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('Input Value PMLPMMMLPMLPMML and Output Match', () => {

      expect(component.robotStackForm.valid).toBeFalsy();
    let valuesData = component.robotStackForm.controls['roboValue'];
    valuesData.setValue('PMLPMMMLPMLPMML');
    expect(component.robotStackForm.valid).toBeTruthy();
    component.sendValues();
    console.log(component.outputData);
      fixture.detectChanges();
    expect(component.outputData).toBe('The Output data is 0211000000');
  });

  it('Input Value PLPLPLPLPLPLPLPLPLPL and Output Match', () => {
      expect(component.robotStackForm.valid).toBeFalsy();
    let valuesData = component.robotStackForm.controls['roboValue'];
    valuesData.setValue('PLPLPLPLPLPLPLPLPLPL');
    expect(component.robotStackForm.valid).toBeTruthy();
    component.sendValues();
    console.log(component.outputData);
    expect(component.outputData).toBe('The Output data is A000000000');
  });

  it('Input Value LLLLLLLLLLLLLLLLLLLLLL and Output Match', () => {
      expect(component.robotStackForm.valid).toBeFalsy();
    let valuesData = component.robotStackForm.controls['roboValue'];
    valuesData.setValue('LLLLLLLLLLLLLLLLLLLLLL');
    expect(component.robotStackForm.valid).toBeTruthy();
    component.sendValues();
    console.log(component.outputData);
    expect(component.outputData).toBe('The Output data is F000000000');
  });
  it('Input Value PMMLPMLPMLPML and Output Doesn"t Match', () => {
      expect(component.robotStackForm.valid).toBeFalsy();
    let valuesData = component.robotStackForm.controls['roboValue'];
    valuesData.setValue('PMMLPMLPMLPML');
    expect(component.robotStackForm.valid).toBeTruthy();
    component.sendValues();
    console.log(component.outputData);
    expect(component.outputData).toBe('The Output data is B000000000');


  });


});
