// api.js (nuevo archivo)
export const sendFormData = async (formData: any) => {
    const response = await fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  
    if (!response.ok) {
      throw new Error('Error en la inserción de datos');
    }
  
    return response.json();
  };
  