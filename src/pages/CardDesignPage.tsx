import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as fabric from 'fabric';
import { motion } from 'framer-motion';
import { Palette, ArrowLeft, Download, Text, Image as ImageIcon, Trash2 } from 'lucide-react';

const LOGO_URL = 'https://user-images.githubusercontent.com/38400331/296766411-9a7000d6-11f8-4228-b80c-03d3c7a6b825.png';
const PROFILE_PLACEHOLDER = 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/150x150/e0e0e0/333?text=Profile';

export default function CardDesignPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [name, setName] = useState('اسم الطالب');
  const [id, setId] = useState('ST2025001');

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 500,
      height: 300,
      backgroundColor: '#f0f0f0',
    });
    fabricCanvasRef.current = canvas;

    // Add card background
    const cardBg = new fabric.Rect({
      width: 480,
      height: 280,
      fill: 'white',
      rx: 20,
      ry: 20,
      shadow: 'rgba(0,0,0,0.2) 5px 5px 10px',
      left: 10,
      top: 10,
      selectable: false,
    });
    canvas.add(cardBg);

    // Add school logo
    fabric.Image.fromURL(LOGO_URL, (img) => {
      img.scaleToWidth(60);
      img.set({ left: 30, top: 30, selectable: false });
      canvas.add(img);
    });

    // Add school name
    const schoolName = new fabric.Textbox('أكاديمية الإتقان التعليمية', {
      left: 100,
      top: 45,
      fontSize: 20,
      fontWeight: 'bold',
      fill: '#0a2a43',
      selectable: false,
      width: 200,
      textAlign: 'right'
    });
    canvas.add(schoolName);

    // Add profile image placeholder
    fabric.Image.fromURL(PROFILE_PLACEHOLDER, (img) => {
      img.set({
        left: 30,
        top: 120,
        selectable: true,
        name: 'profile_pic'
      });
      img.scaleToWidth(100);
      canvas.add(img);
    });

    // Add student name text
    const studentNameText = new fabric.Textbox(name, {
      left: 150,
      top: 140,
      fontSize: 24,
      fontWeight: 'bold',
      fill: '#333',
      name: 'student_name',
      width: 300,
      textAlign: 'right'
    });
    canvas.add(studentNameText);

    // Add student ID text
    const studentIdText = new fabric.Textbox(id, {
      left: 150,
      top: 180,
      fontSize: 18,
      fill: '#666',
      name: 'student_id',
      width: 300,
      textAlign: 'right'
    });
    canvas.add(studentIdText);

    // Add a decorative line
    const line = new fabric.Line([0, 0, 480, 0], {
        left: 10,
        top: 250,
        stroke: '#f3b843',
        strokeWidth: 5,
        selectable: false,
    });
    canvas.add(line);


    canvas.renderAll();

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const nameObj = canvas.getObjects().find(obj => obj.name === 'student_name') as fabric.Textbox;
    if (nameObj) {
      nameObj.set('text', name);
      canvas.renderAll();
    }
  }, [name]);

  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const idObj = canvas.getObjects().find(obj => obj.name === 'student_id') as fabric.Textbox;
    if (idObj) {
      idObj.set('text', id);
      canvas.renderAll();
    }
  }, [id]);

  const handleDownload = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1,
      });
      const link = document.createElement('a');
      link.download = 'student-card.png';
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgURL = event.target?.result as string;
        fabric.Image.fromURL(imgURL, (newImg) => {
          const canvas = fabricCanvasRef.current;
          if (!canvas) return;
          const oldImg = canvas.getObjects().find(obj => obj.name === 'profile_pic');
          if (oldImg) {
            canvas.remove(oldImg);
          }
          newImg.set({ left: 30, top: 120, name: 'profile_pic' });
          newImg.scaleToWidth(100);
          canvas.add(newImg).renderAll();
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl"
      >
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3 space-x-reverse">
                <Palette className="w-8 h-8 text-purple-600" />
                <h1 className="text-3xl font-bold text-gray-900">مصمم البطاقات</h1>
            </div>
            <Link to="/" className="text-gray-600 hover:text-purple-600 flex items-center">
                <ArrowLeft className="ml-2 h-4 w-4" />
                العودة للرئيسية
            </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-4 rounded-xl shadow-lg">
            <canvas ref={canvasRef} />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">خيارات التخصيص</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">اسم الطالب</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">رقم الطالب</label>
              <input 
                type="text" 
                value={id} 
                onChange={(e) => setId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">تحميل صورة شخصية</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />
            </div>

            <div className="border-t pt-6 space-y-3">
                 <button 
                    onClick={handleDownload}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
                >
                    <Download className="ml-2 h-5 w-5" />
                    تحميل البطاقة
                </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
