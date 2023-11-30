"use client"

import { useState } from "react"

export const FormType = Object.freeze({
    Audio: 'audio',
    Video: 'video',
    Mantra: 'mantra'
})

export default function UniversalForm({ formData, setFormData, type = FormType.Mantra }) {


    return (
        <div className="w-full h-full flex flex-col gap-2">
            <div className="flex flex-col gap-1">
                <span className="capitalize">Title</span>
                <input type="text" className="bg-gray-100 rounded-md p-2" value={formData.title} onChange={({ target }) => setFormData(d => ({ ...d, title: target.value }))} />
            </div>
            <div className="flex flex-col gap-1">
                <span className="capitalize">Description</span>
                <textarea type="text" className="bg-gray-100 rounded-md p-2" value={formData.description} onChange={({ target }) => setFormData(d => ({ ...d, description: target.value }))} />
            </div>
            <div className="flex flex-col gap-1">
                <span className="capitalize">Mantra</span>
                <textarea type="text" className="bg-gray-100 rounded-md p-2 min-h-[10rem]" value={formData.mantra} onChange={({ target }) => setFormData(d => ({ ...d, mantra: target.value }))} />
            </div>
            <div className="flex flex-col gap-1">
                <span className="capitalize">Mantra Defination</span>
                <textarea type="text" className="bg-gray-100 rounded-md p-2 min-h-[20rem]" value={formData.defination} onChange={({ target }) => setFormData(d => ({ ...d, defination: target.value }))} />
            </div>
            {
                type != FormType.Mantra && (
                    <div className="flex flex-col gap-1">
                        <span className="capitalize">{type == FormType.Audio ? "Audio" : type == FormType.Video ? 'Video' : ''}</span>
                        <input type="file"
                            accept={(() => {
                                if (type == FormType.Audio)
                                    return 'audio/*';
                                if (type == FormType.Video)
                                    return 'video/*'
                            })()}
                            className="bg-gray-100 rounded-md p-2"
                            onChange={({ target }) => setFormData(d => {
                                const file = target.files[0];
                                return {
                                    ...d,
                                    url: file
                                }
                            })} />
                    </div>
                )
            }
            <div className="flex flex-col gap-1">
                <span className="capitalize">Image cover</span>
                <input type="file"
                    accept='image/*'
                    className="bg-gray-100 rounded-md p-2"
                    onChange={({ target }) => setFormData(d => {
                        const file = target.files[0];
                        return {
                            ...d,
                            coverUrl: file
                        }
                    })} />
            </div>
        </div>
    )
}