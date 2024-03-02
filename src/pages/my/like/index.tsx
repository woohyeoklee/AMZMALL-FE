import useEditLike from '@/components/my/like/hooks/useEditLike'
import FixedBottomButton from '@/components/shared/FixedBottomButton'
import ListRow from '@/components/shared/ListRow'
import addDelimiter from '@/utils/addDelimiter'
import { useEffect, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProps,
} from 'react-beautiful-dnd'

function LikePage() {
  const { data, isEdit, reorder, save } = useEditLike()

  const handleDragEndDrop = (result: any) => {
    if (result.destination == null) {
      return
    }
    const from = result.source.index
    const to = result.destination?.index

    reorder(from, to)
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEndDrop}>
        <StrictModeDroppable droppableId="likes">
          {(droppableProps) => (
            <ul
              ref={droppableProps.innerRef}
              {...droppableProps.droppableProps}
            >
              {data?.map((like, index) => {
                return (
                  <div key={like.id} style={{ minHeight: 1 }}>
                    <Draggable draggableId={like.id} index={index}>
                      {(draggableProps) => (
                        <li
                          ref={draggableProps.innerRef}
                          {...draggableProps.draggableProps}
                          {...draggableProps.dragHandleProps}
                        >
                          <ListRow
                            as="div"
                            left={
                              <img
                                src={like.productImageUrl}
                                alt=""
                                width="80px"
                                height="80px"
                              />
                            }
                            contents={
                              <ListRow.Texts
                                title={like.order}
                                subTitle={like.productName}
                              />
                            }
                            right={`${addDelimiter(like.productPrice)}원`}
                          />
                        </li>
                      )}
                    </Draggable>
                  </div>
                )
              })}
            </ul>
          )}
        </StrictModeDroppable>
      </DragDropContext>

      {isEdit ? <FixedBottomButton label="저장하기" onClick={save} /> : null}
    </div>
  )
}

function StrictModeDroppable({ children, ...props }: DroppableProps) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true))

    return () => {
      cancelAnimationFrame(animation)
      setEnabled(false)
    }
  }, [])

  if (enabled === false) {
    return null
  }

  return <Droppable {...props}>{children}</Droppable>
}

export default LikePage
