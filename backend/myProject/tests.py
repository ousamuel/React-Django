from django.test import TestCase
from django.core.exceptions import ValidationError
from .models import Project
from django.core.files.uploadedfile import SimpleUploadedFile
    # def test_unique_name_constraint(self):
    #     # Test that creating another object with the same name raises an IntegrityError
    #     with self.assertRaises(ValidationError) as cm:
    #         Project.objects.create(title="unique_name", image=SimpleUploadedFile(name='test_image.jpg', content=b'', content_type='image/jpeg'), description ="")
    #     self.assertEqual(cm.exception.message_dict['name'][0], 'This name must be unique.')
    
    
class ProjectImageValidation(TestCase):
    def test_unique_link(self):
        # Create an initial object to test uniqueness constraint
        Project.objects.create(title="project_name", creator='user1', link="https://react-hook-form.com/get-started", description ="")
        with self.assertRaises(ValidationError) as cm:
            Project.objects.create(title="duplicate_link", link="https://react-hook-form.com/get-started", description ="")
        self.assertEqual(cm.exception.message_dict['link'][0], 'Project with this Link already exists.')

    def test_file_type_constraint(self):
        # Test that creating an object with an invalid file type raises a ValidationError
        text_file = SimpleUploadedFile(name='test_image.txt', content=b'This is a text file.', content_type='text/plain')
        with self.assertRaises(ValidationError) as cm:
            project = Project(title="another_name", creator='user1', image=text_file, link="https://react-hook-form.com/get-started#Quickstart", description ="")
            project.full_clean()  # Manually call full_clean to trigger validation
        self.assertEqual(cm.exception.message_dict['image'][0], 'Invalid file type. Only PNG, JPG, and JPEG files are allowed.')
        
        # Test with a valid JPG file
        jpg_file = SimpleUploadedFile(name='test_image.jpg', content=b'\xff\xd8\xff\xe0\x00\x10JFIF', content_type='image/jpg')
        try:
            project_jpg = Project(title="jpg_name", creator='user1', image=jpg_file, link="https://react-hook-form.com/get-started#ReactWebVideoTutorial", description ="")
            project_jpg.full_clean()  # Manually call full_clean to trigger validation
        except ValidationError:
            self.fail("Valid JPEG file raised ValidationError")
            
        # Test with a valid JPEG file
        jpeg_file = SimpleUploadedFile(name='test_image.jpeg', content=b'\xff\xd8\xff\xe0\x00\x10JFIF', content_type='image/jpeg')
        try:
            project_jpeg = Project(title="jpeg_name", creator='user1', image=jpeg_file, link="https://react-hook-form.com/get-started#IntegratingwithUIlibraries", description ="")
            project_jpeg.full_clean()
        except ValidationError:
            self.fail("Valid JPEG file raised ValidationError")
        
        # Test with a valid PNG file
        png_file = SimpleUploadedFile(name='test_image.png', content=b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01', content_type='image/png')
        try:
            project_png = Project(title="png_name", image=png_file, link="https://react-hook-form.com/get-started#Registerfields", description ="")
            project_png.full_clean()
        except ValidationError:
            self.fail("Valid PNG file raised ValidationError")
