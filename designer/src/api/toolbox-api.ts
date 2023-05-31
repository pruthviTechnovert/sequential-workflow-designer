import { Step } from '../definition';
import { BehaviorController } from '../behaviors/behavior-controller';
import { ObjectCloner, Uid, Vector } from '../core';
import { StepDefinition } from '../designer-configuration';
import { DesignerState } from '../designer-state';
import { DragStepBehavior } from '../behaviors/drag-step-behavior';
import { DesignerContext } from '../designer-context';
import { LayoutController } from '../layout-controller';
import { IconProvider } from '../core/icon-provider';

export class ToolboxApi {
	public constructor(
		private readonly state: DesignerState,
		private readonly designerContext: DesignerContext,
		private readonly behaviorController: BehaviorController,
		private readonly layoutController: LayoutController,
		private readonly iconProvider: IconProvider
	) {}

	public isVisibleAtStart(): boolean {
		return this.layoutController.isMobile();
	}

	public tryGetIconUrl(step: StepDefinition): string | null {
		return this.iconProvider.getIconUrl(step);
	}

	/**
	 * @param position Mouse or touch position.
	 * @param step Step definition.
	 * @returns If started dragging returns true, otherwise returns false.
	 */
	public tryDrag(position: Vector, step: StepDefinition): boolean {
		if (!this.state.isReadonly) {
			const newStep = createStep(step);
			this.behaviorController.start(position, DragStepBehavior.create(this.designerContext, newStep));
			return true;
		}
		return false;
	}
}

function createStep(step: StepDefinition): Step {
	const newStep = ObjectCloner.deepClone(step) as Step;
	newStep.id = Uid.next();
	return newStep;
}