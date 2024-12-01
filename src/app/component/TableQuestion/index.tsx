"use client"
import {Table} from "@radix-ui/themes"
import React from "react";

type Irow = Array<number | string>

interface props {
    data: Array<Irow>,
    Component?: React.FC<any>,
    ComponenteDelete?: React.FC<any>,
    updateQuestions?: () => void,
}

const TableQuestion: React.FC<props> = ({data, Component, ComponenteDelete, updateQuestions}) => {

    return (<>

        <Table.Root variant="surface">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>Título</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Descrição</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Área de atuação</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                    data.map((row, index) => {
                        return (
                            <Table.Row key={`${row[1]}` + index}>
                                <Table.Cell>{row[1]}</Table.Cell>
                                <Table.Cell>{row[2]}</Table.Cell>
                                <Table.Cell>{row[3]}</Table.Cell>

                                {Component && <Table.Cell>{<Component id={row[0]} row={row}  updateQuestions={updateQuestions}/>}</Table.Cell>}
                                {ComponenteDelete && <Table.Cell>{<ComponenteDelete id={row[0]} updateQuestions={updateQuestions} />}</Table.Cell>}
                            </Table.Row>
                        )
                    })
                }

            </Table.Body>
        </Table.Root>
    </>)
}

export default TableQuestion