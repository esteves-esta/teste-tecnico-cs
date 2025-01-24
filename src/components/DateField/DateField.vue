<script setup lang="ts">
import {
  DatePickerArrow,
  DatePickerCalendar,
  DatePickerCell,
  DatePickerCellTrigger,
  DatePickerContent,
  DatePickerField,
  DatePickerGrid,
  DatePickerGridBody,
  DatePickerGridHead,
  DatePickerGridRow,
  DatePickerHeadCell,
  DatePickerHeader,
  DatePickerHeading,
  DatePickerInput,
  DatePickerNext,
  DatePickerPrev,
  DatePickerRoot,
  DatePickerTrigger,
} from 'radix-vue'
import Icon from '@/components/Icon/Icon.vue'
import { useId } from 'radix-vue'
import type { DateValue } from '@internationalized/date'
import FieldLabel from '@/components/FieldLabel/FieldLabel.vue'

const id = useId()

interface Props {
  label: string
  icon?: string
  required?: boolean
  errorMessage: string
}
const value = defineModel<DateValue | undefined>()
const error = defineModel('error')
const props = withDefaults(defineProps<Props>(), {
  icon: 'Calendar',
})

const { required, label, errorMessage, icon } = props
</script>

<template>
  <div :class="[classes.date_wrapper, error && classes.error]">
    <FieldLabel :required="required" :for="id">{{ label }} </FieldLabel>

    <DatePickerRoot
      locale="pt-br"
      :defaultValue="undefined"
      :id="id"
      granularity="day"
      :required="required"
      v-model="value"
    >
      <DatePickerField v-slot="{ segments }" :class="classes.date_field">
        <template v-for="item in segments" :key="item.part">
          <DatePickerInput
            v-if="item.part === 'literal'"
            :part="item.part"
            :class="classes.date_field_literal"
          >
            {{ item.value }}
          </DatePickerInput>
          <DatePickerInput v-else :part="item.part" :class="classes.date_field_segment">
            {{ item.value }}
          </DatePickerInput>
        </template>

        <DatePickerTrigger :class="classes.popover_trigger">
          <Icon :size="24" :name="icon" />
        </DatePickerTrigger>
      </DatePickerField>

      <DatePickerContent align="end" :side-offset="16" :class="classes.popover_content">
        <DatePickerArrow :class="classes.popover_arrow" />
        <DatePickerCalendar v-slot="{ weekDays, grid }" :class="classes.calendar">
          <DatePickerHeader :class="classes.calendar_header">
            <DatePickerPrev :class="classes.calendar_nav_button">
              <Icon :size="24" name="ChevronLeft" />
            </DatePickerPrev>

            <DatePickerHeading :class="classes.calendar_heading" />
            <DatePickerNext :class="classes.calendar_nav_button">
              <Icon :size="24" name="ChevronRight" />
            </DatePickerNext>
          </DatePickerHeader>
          <div :class="classes.calendar_wrapper">
            <DatePickerGrid
              v-for="month in grid"
              :key="month.value.toString()"
              :class="classes.calendarGrid"
            >
              <DatePickerGridHead>
                <DatePickerGridRow :class="classes.calendar_grid_row">
                  <DatePickerHeadCell
                    v-for="day in weekDays"
                    :key="day"
                    :class="classes.calendar_head_cell"
                  >
                    {{ day }}
                  </DatePickerHeadCell>
                </DatePickerGridRow>
              </DatePickerGridHead>
              <DatePickerGridBody>
                <DatePickerGridRow
                  v-for="(weekDates, index) in month.rows"
                  :key="`weekDate-${index}`"
                  :class="classes.calendar_grid_row"
                >
                  <DatePickerCell
                    v-for="weekDate in weekDates"
                    :key="weekDate.toString()"
                    :date="weekDate"
                    :class="classes.calendar_cell"
                  >
                    <DatePickerCellTrigger
                      :day="weekDate"
                      :month="month.value"
                      :class="classes.calendar_cell_trigger"
                    />
                  </DatePickerCell>
                </DatePickerGridRow>
              </DatePickerGridBody>
            </DatePickerGrid>
          </div>
        </DatePickerCalendar>
      </DatePickerContent>
    </DatePickerRoot>

    <span v-if="error" :class="classes.error_help_text">
      {{ errorMessage }}
    </span>
  </div>
</template>

<style module="classes">
.date_wrapper.error {
  --calendar-text: var(--color-error);
  --calendar-border: var(--color-error);
  label,
  span {
    color: var(--color-error);
  }
}
.date_wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  --calendar-text: var(--color-text);
  --calendar-border: var(--color-text);
}

.date_field {
  display: flex;
  align-items: center;
  text-align: center;
  user-select: none;
  font-size: 1rem;
  width: 100%;
  font-weight: 400;
  border: 1px solid var(--calendar-border);
  border-radius: var(--space-s);
  padding: 8px 16px 10px 16px;
  color: var(--calendar-text);
  transition: border-color 350ms ease-in;
  outline: none;
  &:focus-within {
    --calendar-border: var(--color-primary-dark);
    box-shadow: var(--box-shadow);
  }
}

.date_field::placeholder {
  color: var(--calendar-text);
}

.date_field[data-invalid] {
  border-color: var(--color-error);
}

.date_field_literal {
  padding: 0 0.15rem;
}

.popover_trigger:focus,
.date_field_segment:focus {
  outline: 1px solid var(--color-primary-light);
}

.popover_trigger {
  cursor: pointer;
  background: transparent;
  border: none;
  color: var(--calendar-text);
  margin-left: auto;
}

.calendar {
  padding: 20px;
}

.calendar_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.calendar_nav_button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  color: var(--color-primary-dark);
  background-color: transparent;
  cursor: pointer;
  border: none;
  &:hover {
    color: var(--color-primary);
  }
}
.calendar_heading {
  font-weight: 600;
  color: var(--color-primary);
}

.calendar_wrapper {
  display: flex;
  padding-top: 1rem;
  margin-top: 1rem;
  flex-direction: column;
}

@media (min-width: 640px) {
  .calendar_wrapper {
    margin-left: 1rem;
    margin-top: 0;
    flex-direction: row;
  }
}

.calendarGrid {
  margin-top: 0.25rem;
  width: 100%;
  user-select: none;
  border-collapse: collapse;
}

.calendar_grid_row {
  display: grid;
  margin-bottom: 0.2rem;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  width: 100%;
}

.calendar_grid_row[data-radix-vue-calendar-month-view] {
  grid-template-columns: repeat(7, minmax(0, 1fr));
}

.calendar_head_cell {
  border-radius: 0.375rem;
  font-size: 0.75rem;
  line-height: 1rem;
  color: var(--color-text);
  font-weight: 400;
}

.calendar_cell {
  position: relative;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: center;
}

.calendar_cell_trigger {
  display: flex;
  position: relative;
  padding: 0.65rem;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 100%;
  outline-style: none;
  font-size: 0.7rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: var(--color-text);
  white-space: nowrap;
  background-color: transparent;
  cursor: pointer;
}

.calendar_cell_trigger:hover {
  border-color: var(--color-primary-dark);
}

.calendar_cell_trigger:focus {
  border-color: var(--color-primary-dark);
}

.calendar_cell_trigger[data-disabled] {
  cursor: none;
  color: rgba(0, 0, 0, 0.3);
}

.calendar_cell_trigger[data-selected] {
  background-color: var(--color-primary);
  color: var(--white);
  font-weight: 500;
}

.calendar_cell_trigger[data-selected]::before {
  background-color: var(--white);
}

.calendar_cell_trigger[data-unavailable] {
  color: rgba(0, 0, 0, 0.3);
  text-decoration: line-through;
}
.calendar_cell_trigger[data-today]::before {
  display: block;
  background-color: var(--color-primary-light);
}

.popover_content {
  border-radius: 4px;
  padding: 10px;
  width: 400px;
  background-color: var(--white);
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}
.popover_content:focus {
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px,
    0 0 0 2px var(--grass-7);
}
.popover_content[data-state='open'][data-side='top'] {
  animation-name: slideDownAndFade;
}
.popover_content[data-state='open'][data-side='right'] {
  animation-name: slideLeftAndFade;
}
.popover_content[data-state='open'][data-side='bottom'] {
  animation-name: slideUpAndFade;
}
.popover_content[data-state='open'][data-side='left'] {
  animation-name: slideRightAndFade;
}

.popover_arrow {
  fill: var(--white);
}

@keyframes slideUpAndFade {
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideRightAndFade {
  from {
    opacity: 0;
    transform: translateX(-2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideDownAndFade {
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideLeftAndFade {
  from {
    opacity: 0;
    transform: translateX(2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
