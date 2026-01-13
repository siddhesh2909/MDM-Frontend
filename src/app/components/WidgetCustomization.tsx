'use client';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const WidgetCustomization = () => {
    const [widgets, setWidgets] = useState([
        { id: '1', content: 'Widget 1' },
        { id: '2', content: 'Widget 2' },
        { id: '3', content: 'Widget 3' },
        { id: '4', content: 'Widget 4' },
    ]);

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedWidgets = Array.from(widgets);
        const [removed] = reorderedWidgets.splice(result.source.index, 1);
        reorderedWidgets.splice(result.destination.index, 0, removed);
        setWidgets(reorderedWidgets);
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold">Customize Your Widgets</h2>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="bg-gray-200 p-4 rounded-lg mt-2"
                        >
                            {widgets.map((widget, index) => (
                                <Draggable key={widget.id} draggableId={widget.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="bg-white p-2 mb-2 rounded shadow"
                                        >
                                            {widget.content}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default WidgetCustomization;
