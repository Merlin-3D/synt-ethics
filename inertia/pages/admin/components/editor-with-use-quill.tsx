import { useEffect, useRef } from 'react'
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'

interface EditorProps {
  handleButtonClick: (editorContent: string) => void
  initialContent: string
}

export default function EditorQuill({ handleButtonClick, initialContent }: EditorProps) {
  const { quill, quillRef, Quill } = useQuill({
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        ['blockquote', 'code-block'],
        ['link', ],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ['clean'],
      ],
      imageResize: {
        modules: ['Resize', 'DisplaySize', 'Toolbar'],
      },
    },

    formats: [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'list',
      'bullet',
      'indent',
      'blockquote',
      'code-block',
      'link',
      'image',
      'video',
      'color',
      'background',
      'align',
    ],
  })

  const isRegistered = useRef(false)

  // Enregistrer le module ImageResize
  useEffect(() => {
    if (Quill && !isRegistered.current) {
      // Quill.register('modules/imageResize', ImageResize)
      isRegistered.current = true
    }
  }, [Quill])

  useEffect(() => {
    if (quill) {
      // Initialiser le contenu
      if (quill.root.innerHTML !== initialContent) {
        quill.clipboard.dangerouslyPasteHTML(initialContent)
      }

      // Gérer l'upload d'images
      const toolbar = quill.getModule('toolbar')
      //@ts-ignore
      toolbar.addHandler('image', () => {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.click()

        input.onchange = () => {
          const file = input.files?.[0]
          if (file) {
            // Ici vous pouvez uploader le fichier vers votre serveur
            // Pour l'instant on utilise un object URL local
            const imageUrl = URL.createObjectURL(file)
            const range = quill.getSelection()
            quill.insertEmbed(range?.index || 0, 'image', imageUrl)
          }
        }
      })

      // Écouter les changements
      const handleTextChange = () => {
        handleButtonClick(quill.root.innerHTML)
      }

      quill.on('text-change', handleTextChange)

      return () => {
        quill.off('text-change', handleTextChange)
      }
    }
  }, [quill, initialContent, handleButtonClick])

  return (
    <div className="editor-container rounded-lg overflow-hidden">
      <div ref={quillRef} style={{ height: '400px' }} />
    </div>
  )
}
