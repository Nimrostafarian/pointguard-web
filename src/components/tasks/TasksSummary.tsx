import classNames from 'classnames'
import React, { useCallback } from 'react'
import type { TasksPerPhase } from '../../entity/phase'
import { useAccordion } from '../../hook/useAccordion'
import { Accordion } from '../accordion/Accordion'

type TasksSummaryProps = Readonly<{
  tasksPerPhase: TasksPerPhase[]
  points: number
}>

export const TasksSummary: React.FC<TasksSummaryProps> = ({ tasksPerPhase, points }) => {
  const [activeIndex, setActiveIndex] = useAccordion()

  const handleClick = useCallback(
    (index: number) => () => {
      activeIndex === index ? setActiveIndex(null) : setActiveIndex(index)
    },
    [activeIndex, setActiveIndex]
  )

  return (
    <div className="okp4-nemeton-web-tasks-summary-main">
      <div className="okp4-nemeton-web-tasks-summary-header-container">
        <h2>tasks and challenges</h2>
        <div className="okp4-nemeton-web-tasks-summary-header-points-wrapper">
          <p>{points.toLocaleString()}</p>
          <p>points earned</p>
        </div>
      </div>
      <div className="okp4-nemeton-web-tasks-summary-content-container">
        {tasksPerPhase.map((taskPerPhase, index) => (
          <Accordion
            content={<p>Test</p>}
            disabled={!taskPerPhase.phase.started}
            iconProps={{ width: 30, height: 30 }}
            isExpanded={activeIndex === index}
            key={index}
            onToggle={handleClick(index)}
            title={
              <div
                className={classNames('okp4-nemeton-web-tasks-summary-accordion-title-wrapper', {
                  disabled: !taskPerPhase.phase.started
                })}
              >
                <h2>{`phase ${taskPerPhase.phase.number}`}</h2>
                {taskPerPhase.phase.started && (
                  <p>
                    {taskPerPhase.phase.points > 0 ? taskPerPhase.phase.points.toLocaleString() : 0}
                  </p>
                )}
              </div>
            }
            variant="secondary"
          />
        ))}
      </div>
    </div>
  )
}
